# Translation Verification Script for All Group Excursions
# Checks all 4 languages (EN, RU, DE, FR) for translation completeness

$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImFjZGVmMWViLTM5ZTAtNDE2Mi04YTMyLTQ3NWU3ODMyMWEyYyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTQwMTI1NTgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.TMQ6t60-uX8kolvR2Jgb0lZJpg8pUiXUjaW-rERtOtA"
$headers = @{Authorization="Bearer $token"}
$baseUrl = "https://touristtt.runasp.net/api"
$languages = @("en", "de", "ru", "fr")

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Translation Verification Report" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Get all excursions
Write-Host "[INFO] Fetching all excursions..." -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl/admin/excursions?pageNumber=1&pageSize=100&lang=en&currency=USD" -Headers $headers -Method Get
$excursions = $response.data
$totalCount = $response.totalCount

Write-Host "[INFO] Found $totalCount excursions" -ForegroundColor Green
Write-Host ""

$issuesFound = @()
$completeCount = 0

foreach ($excursion in $excursions) {
    $excursionId = $excursion.id
    $englishTitle = $excursion.title
    
    Write-Host "Checking: $englishTitle ($excursionId)" -ForegroundColor White
    
    $translations = @{}
    $hasIssues = $false
    
    foreach ($lang in $languages) {
        try {
            $data = Invoke-RestMethod -Uri "$baseUrl/admin/excursions/$excursionId?lang=$lang&currency=USD" -Headers $headers -Method Get
            $translations[$lang] = $data
            
            # Check if title, subtitle, shortDescription are translated
            if ($lang -ne "en") {
                $titleSame = $data.title -eq $translations["en"].title
                $subtitleSame = $data.subtitle -eq $translations["en"].subtitle
                $descSame = $data.shortDescription -eq $translations["en"].shortDescription
                
                if ($titleSame -or $subtitleSame -or $descSame) {
                    $hasIssues = $true
                    $issue = [PSCustomObject]@{
                        ExcursionId = $excursionId
                        EnglishTitle = $englishTitle
                        Language = $lang.ToUpper()
                        TitleIssue = $titleSame
                        SubtitleIssue = $subtitleSame
                        DescriptionIssue = $descSame
                    }
                    $issuesFound += $issue
                    
                    Write-Host "  [$($lang.ToUpper())] ISSUE FOUND:" -ForegroundColor Red
                    if ($titleSame) { Write-Host "    - Title not translated" -ForegroundColor Red }
                    if ($subtitleSame) { Write-Host "    - Subtitle not translated" -ForegroundColor Red }
                    if ($descSame) { Write-Host "    - Description not translated" -ForegroundColor Red }
                }
                else {
                    Write-Host "  [$($lang.ToUpper())] OK" -ForegroundColor Green
                }
            }
        }
        catch {
            Write-Host "  [$($lang.ToUpper())] ERROR: $($_.Exception.Message)" -ForegroundColor Red
            $hasIssues = $true
        }
    }
    
    if (-not $hasIssues) {
        $completeCount++
    }
    
    Write-Host ""
}

# Summary
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Total Excursions: $totalCount" -ForegroundColor White
Write-Host "Fully Translated: $completeCount" -ForegroundColor Green
Write-Host "With Issues: $($issuesFound.Count / 3)" -ForegroundColor $(if ($issuesFound.Count -gt 0) { "Red" } else { "Green" })
Write-Host ""

if ($issuesFound.Count -gt 0) {
    Write-Host "ISSUES DETAIL:" -ForegroundColor Yellow
    Write-Host ""
    
    $groupedIssues = $issuesFound | Group-Object ExcursionId
    
    foreach ($group in $groupedIssues) {
        $firstIssue = $group.Group[0]
        Write-Host "$($firstIssue.EnglishTitle)" -ForegroundColor White
        Write-Host "  ID: $($firstIssue.ExcursionId)" -ForegroundColor Gray
        
        foreach ($issue in $group.Group) {
            Write-Host "  Language: $($issue.Language)" -ForegroundColor Yellow
            if ($issue.TitleIssue) { Write-Host "    - Title not translated" -ForegroundColor Red }
            if ($issue.SubtitleIssue) { Write-Host "    - Subtitle not translated" -ForegroundColor Red }
            if ($issue.DescriptionIssue) { Write-Host "    - Description not translated" -ForegroundColor Red }
        }
        Write-Host ""
    }
    
    # Export to CSV
    $csvPath = "translation-issues-report.csv"
    $issuesFound | Export-Csv -Path $csvPath -NoTypeInformation -Encoding UTF8
    Write-Host "Issues exported to: $csvPath" -ForegroundColor Green
}
else {
    Write-Host "All excursions are fully translated!" -ForegroundColor Green
}

Write-Host "Verification complete!" -ForegroundColor Cyan
