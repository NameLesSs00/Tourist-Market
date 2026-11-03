"use client";

import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  TransferCommunicationMethod,
  TransferTripType,
} from "@/models/transferBooking";
import type { TransferLocationItem } from "@/models/transferLocation";
import { getVehicleTypeTransfers } from "@/clientApi/vehicleTypeTransferApi";
import {
  useCreateTransferBooking,
  useTransferCountries,
  useTransferFromLocations,
  useTransferMatch,
  useTransferToLocations,
} from "@/features/transferBookings/useClientTransferBooking";
import { sanitizePhoneNumber } from "@/shared/utils/phoneUtils";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import { getDictionary } from "@/shared/utils/getDictionary";
import { useCurrencyStore } from "@/features/currencies/currencyStore";
import {
  buildTransferBookingPayload,
  resolveVehiclePerks,
  validateTransferBookingFields,
  type ConfirmedTransferBooking,
} from "./transferBookingValidation";

export type { ConfirmedTransferBooking };

export function useTransferBookingForm(locale: string = "en") {
  const selectedCurrency = useCurrencyStore((s) => s.selectedCurrency);

  // Remote Reference Data
  const { data: fromLocations = [], isLoading: isLoadingFrom } = useTransferFromLocations(locale);
  const { data: toLocations = [], isLoading: isLoadingTo } = useTransferToLocations(locale);
  const { data: countries = [], isLoading: isLoadingCountries } = useTransferCountries(locale);

  // Vehicle Types for perks
  const { data: vehicleTypesResult } = useQuery({
    queryKey: ["client-vehicle-type-transfers", locale],
    queryFn: () => getVehicleTypeTransfers({ pageSize: 50, lang: locale }),
    staleTime: 5 * 60 * 1000,
  });

  // Form State: EMPTY by default so user explicitly chooses
  const [fromLocationId, setFromLocationId] = useState<string>("");
  const [toLocationId, setToLocationId] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [tripType, setTripType] = useState<TransferTripType>(TransferTripType.OneWay);
  const [additionalHours, setAdditionalHours] = useState<number>(0);

  const [tripDate, setTripDate] = useState<string>("");
  const [tripTime, setTripTime] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");

  const [customerName, setCustomerName] = useState<string>("");
  const [countryId, setCountryId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [communicationMethod, setCommunicationMethod] = useState<TransferCommunicationMethod>(TransferCommunicationMethod.WhatsApp);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [luggageCount, setLuggageCount] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");

  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedTransferBooking | null>(null);

  // Set default country only (phoneCode assistance)
  useEffect(() => {
    if (!countryId && countries.length > 0) {
      setCountryId(countries[0].id);
      if (countries[0].phoneCode && !phoneNumber) {
        setPhoneNumber(sanitizePhoneNumber(countries[0].phoneCode));
      }
    }
  }, [countries, countryId, phoneNumber]);

  const hasRouteSelected = Boolean(fromLocationId && toLocationId);

  // Selected Location Names
  const fromName = useMemo(() => {
    return fromLocations.find((l: TransferLocationItem) => l.id === fromLocationId)?.name || "";
  }, [fromLocations, fromLocationId]);

  const toName = useMemo(() => {
    return toLocations.find((l: TransferLocationItem) => l.id === toLocationId)?.name || "";
  }, [toLocations, toLocationId]);

  // Dynamic Matching & Calculation via API /api/transfer-bookings/match
  const {
    data: matchData,
    isFetching: isCalculatingPrice,
    error: matchError,
    isError: isMatchError,
  } = useTransferMatch({
    fromLocationId: fromLocationId || undefined,
    toLocationId: toLocationId || undefined,
    adults,
    children: childrenCount,
    tripType,
    additionalHours,
    currency: selectedCurrency.code,
    lang: locale,
  });

  const currencySymbol = matchData?.currencySymbol || selectedCurrency.symbol || "$";
  const currencyCode = matchData?.currency || selectedCurrency.code || "USD";

  // Extract exact backend error message (e.g. "No route price found for vehicle type...")
  const matchErrorMessage = useMemo(() => {
    if (!matchError) return null;
    return extractErrorMessage(
      matchError,
      "No route price found for the selected vehicle and route."
    );
  }, [matchError]);

  // Vehicle perks resolved from backend match + vehicle types
  const { additionalHourRate, discountPercentage, vehicleName: currentVehicleType } =
    useMemo(() => {
      return resolveVehiclePerks(matchData, vehicleTypesResult?.items);
    }, [matchData, vehicleTypesResult]);

  const isRoundTrip = tripType === TransferTripType.RoundTrip;

  const currentPrice = hasRouteSelected && matchData?.price?.finalPrice
    ? matchData.price.finalPrice
    : 0;

  const basePrice = hasRouteSelected && matchData?.price?.oneWayPrice
    ? isRoundTrip
      ? matchData.price.oneWayPrice * 2
      : matchData.price.oneWayPrice
    : 0;

  const discountAmount = hasRouteSelected && matchData?.price?.discountAmount
    ? matchData.price.discountAmount
    : 0;

  // Submit Mutation
  const createBookingMutation = useCreateTransferBooking();

  const handleCountryChange = (id: string) => {
    setCountryId(id);
    const found = countries.find((c) => c.id === id);
    if (found?.phoneCode && (!phoneNumber || /^\+\d{1,4}$/.test(phoneNumber.trim()))) {
      setPhoneNumber(sanitizePhoneNumber(found.phoneCode));
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setFromLocationId(""); setToLocationId("");
    setTripDate(""); setTripTime("");
    setReturnDate(""); setReturnTime("");
    setAdditionalHours(0); setCustomerName("");
    setEmail(""); setPhoneNumber(""); setNotes("");
  };

  const handleSubmitBooking = async () => {
    if (isMatchError && matchErrorMessage) {
      toast.error(matchErrorMessage);
      return;
    }

    const isValid = validateTransferBookingFields(
      {
        fromLocationId,
        toLocationId,
        tripDate,
        tripTime,
        tripType,
        returnDate,
        returnTime,
        customerName,
        countryId,
        email,
        phoneNumber,
      },
      locale
    );
    if (!isValid) return;

    const payload = buildTransferBookingPayload({
      fromLocationId,
      toLocationId,
      adults,
      childrenCount,
      tripType,
      tripDate,
      tripTime,
      returnDate,
      returnTime,
      customerName,
      countryId,
      email,
      communicationMethod,
      phoneNumber,
      luggageCount,
      notes,
      additionalHours,
    });

    try {
      const res = await createBookingMutation.mutateAsync(payload);
      setConfirmedBooking({
        ...res,
        fromName: fromName || "Pickup Location",
        toName: toName || "Destination",
        adults: Number(adults) || 1,
        childrenCount: Number(childrenCount) || 0,
        vehicleName: currentVehicleType || "Matched Vehicle",
        tripType,
        tripDate,
        tripTime,
        returnDate: isRoundTrip ? returnDate : undefined,
        returnTime: isRoundTrip ? returnTime : undefined,
        additionalHours,
        additionalHourRate,
        customerName: customerName.trim(),
        email: email.trim(),
        phoneNumber: sanitizePhoneNumber(phoneNumber),
        currencySymbol,
        currencyCode,
      });
    } catch (err) {
      const dict = getDictionary(locale);
      toast.error(
        extractErrorMessage(
          err,
          dict.transfer.validation.bookingFailed
        )
      );
    }
  };

  return {
    fromLocations,
    toLocations,
    countries,
    isLoadingLocations: isLoadingFrom || isLoadingTo,
    isLoadingCountries,
    hasRouteSelected,
    fromName,
    toName,
    currentVehicleType,
    additionalHourRate,
    discountPercentage,
    currentPrice,
    basePrice,
    discountAmount,
    isCalculatingPrice,
    isMatchError: Boolean(hasRouteSelected && isMatchError),
    matchErrorMessage,
    isRoundTrip,
    fromLocationId,
    toLocationId,
    adults,
    childrenCount,
    tripType,
    additionalHours,
    tripDate,
    tripTime,
    returnDate,
    returnTime,
    customerName,
    countryId,
    email,
    communicationMethod,
    phoneNumber,
    luggageCount,
    notes,
    currencySymbol,
    currencyCode,
    confirmedBooking,
    isSubmitting: createBookingMutation.isPending,
    setFromLocationId, setToLocationId, setAdults, setChildrenCount,
    setTripType, setAdditionalHours, setTripDate, setTripTime,
    setReturnDate, setReturnTime, setCustomerName, handleCountryChange,
    setEmail, setCommunicationMethod,
    setPhoneNumber: (val: string) => setPhoneNumber(sanitizePhoneNumber(val)),
    setLuggageCount, setNotes, handleSubmitBooking, handleReset,
  };
}
