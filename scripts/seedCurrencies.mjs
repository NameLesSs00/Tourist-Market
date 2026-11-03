import https from "https";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjRiYzQwZDg5LWFiY2UtNDM2Ni05NjVlLTY1OTViNzQ3Yzk5NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM3NDM3MzEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.hJ5pdu7WhVC4Va3baU1GR5gr_PZY7iAFhqJ6s53sUFA";

const TARGET_CURRENCIES = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    exchangeRate: 1.0,
    isActive: true,
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "\u20AC",
    exchangeRate: 0.92,
    isActive: true,
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "\u00A3",
    exchangeRate: 0.79,
    isActive: true,
  },
];

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error("Request timed out"));
    });
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function seed() {
  console.log("Checking existing currencies in backend...");
  try {
    const listRes = await request({
      hostname: "touristtt.runasp.net",
      path: "/api/currencies?pageNumber=1&pageSize=50",
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    console.log("Existing currencies status:", listRes.status);
    const existing = listRes.data?.data?.items || listRes.data?.items || [];
    console.log(`Found ${existing.length} existing currency entries.`);

    for (const cur of TARGET_CURRENCIES) {
      const found = existing.find(
        (c) => c.code?.toUpperCase() === cur.code.toUpperCase()
      );

      if (found) {
        console.log(`Currency ${cur.code} already exists with ID ${found.id}. Updating...`);
        const updateRes = await request(
          {
            hostname: "touristtt.runasp.net",
            path: `/api/currencies/${found.id}`,
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
          },
          cur
        );
        console.log(`Updated ${cur.code}: status ${updateRes.status}`);
      } else {
        console.log(`Creating currency ${cur.code}...`);
        const createRes = await request(
          {
            hostname: "touristtt.runasp.net",
            path: "/api/currencies",
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
          },
          cur
        );
        console.log(`Created ${cur.code}: status ${createRes.status}`);
      }
    }

    console.log("Seeding process completed successfully.");
  } catch (err) {
    console.error("Seeding error:", err.message);
  }
}

seed();

