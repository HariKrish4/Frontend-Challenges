# Blood Donor Matching Agent

## Overview

The **Blood Donor Matching Agent** is an AI-powered solution that identifies suitable blood donors from a CSV-based donor database based on a patient's blood requirement request.

The agent analyzes donor information, validates donor eligibility, applies blood-group compatibility rules, ranks eligible donors, and returns a prioritized list of donors in a structured JSON format.

This solution is intended to support blood banks, hospitals, NGOs, and emergency response teams in quickly finding eligible donors for patients in need.

---

## Features

- Accepts patient blood requirement requests.
- Processes donor information from a CSV file.
- Supports blood group compatibility matching.
- Filters unavailable donors.
- Excludes recently donated donors (within the last 90 days).
- Prioritizes donors based on:
  - Exact blood group match
  - Compatible blood group match
  - Donor availability
  - Geographic proximity
  - Donation history
- Generates ranked donor recommendations.
- Returns results in machine-readable JSON format.
- Supports emergency and planned blood requirement scenarios.

---

## Input Requirements

### 1. Patient Request

The user provides patient-related information in JSON format.

**Sample Input**

```json
{
  "patientName": "John Doe",
  "patientContact": "+919876543210",
  "age": 42,
  "hospitalName": "Apollo Hospital Chennai",
  "bloodGroup": "B+",
  "requiredUnits": 3,
  "treatmentType": "Cardiac Surgery",
  "contactPerson": "Ramesh Kumar"
}
```

**Required Fields**

| Field | Description |
|---|---|
| `patientName` | Name of the patient |
| `patientContact` | Contact number |
| `age` | Patient age |
| `hospitalName` | Hospital requiring blood |
| `bloodGroup` | Required blood group |
| `requiredUnits` | Number of blood units required |
| `treatmentType` | Purpose of blood requirement |
| `contactPerson` | Coordinator or attendant |

---

### 2. Donor CSV File

The donor database should be provided as a CSV file.

**Sample CSV Structure**

```csv
donor_id,name,age,gender,blood_group,mobile,email,city,state,last_donation_date,availability_status,total_donations
D001,Raj Kumar,28,Male,B+,9876543210,raj@email.com,Chennai,Tamil Nadu,2026-04-10,Available,8
D002,Suresh,35,Male,O+,9876501234,suresh@email.com,Chennai,Tamil Nadu,2026-01-15,Available,12
```

**Recommended CSV Fields**

| Field | Required |
|---|---|
| `donor_id` | Yes |
| `name` | Yes |
| `blood_group` | Yes |
| `mobile` | Yes |
| `city` | Yes |
| `state` | Yes |
| `last_donation_date` | Yes |
| `availability_status` | Yes |
| `total_donations` | Optional |
| `email` | Optional |

---

## Donor Selection Rules

### 1. Blood Group Compatibility

The agent uses standard blood transfusion compatibility rules.

| Recipient | Compatible Donor Groups |
|---|---|
| O- | O- |
| O+ | O+, O- |
| A- | A-, O- |
| A+ | A+, A-, O+, O- |
| B- | B-, O- |
| B+ | B+, B-, O+, O- |
| AB- | AB-, A-, B-, O- |
| AB+ | All Blood Groups |

### 2. Availability Check

Only donors marked as `Available` will be considered.

### 3. Donation Eligibility

The agent excludes donors who donated blood within the last 90 days.

```
Current Date - Last Donation Date >= 90 Days
```

### 4. Location Preference

Donors are prioritized in the following order:

1. Same City
2. Same District (if available)
3. Same State
4. Other States

---

## Ranking Logic

Each donor receives a score based on relevance.

**Suggested Scoring Model**

| Criteria | Score |
|---|---|
| Exact Blood Group Match | 50 |
| Compatible Blood Group Match | 30 |
| Eligible to Donate | 20 |
| Same City | 20 |
| Same State | 10 |
| More than 5 Previous Donations | 10 |

**Ranking Outcome:** `Higher Score = Higher Priority`

The final donor list is sorted in descending order of score.

---

## Output Format

The agent returns a structured JSON response.

**Sample Response**

```json
{
  "requestSummary": {
    "patientName": "John Doe",
    "bloodGroup": "B+",
    "requiredUnits": 3,
    "hospitalName": "Apollo Hospital Chennai",
    "treatmentType": "Cardiac Surgery"
  },
  "matchingStatistics": {
    "totalDonorsInFile": 500,
    "eligibleDonors": 120,
    "exactMatches": 28,
    "compatibleMatches": 45
  },
  "recommendedDonors": [
    {
      "rank": 1,
      "matchScore": 97,
      "donorId": "D001",
      "name": "Raj Kumar",
      "bloodGroup": "B+",
      "mobile": "9876543210",
      "city": "Chennai",
      "state": "Tamil Nadu",
      "age": 28,
      "lastDonationDate": "2026-04-10",
      "totalDonations": 8,
      "matchType": "Exact Match"
    }
  ]
}
```

**No Match Scenario**

If no eligible donors are found, the agent returns:

```json
{
  "status": "NO_MATCH_FOUND",
  "message": "No eligible donors found for the requested blood group."
}
```

---

## Agent Responsibilities

The agent must:

- Read donor data exclusively from the provided CSV.
- Validate donor eligibility.
- Apply compatibility rules correctly.
- Rank donors objectively.
- Return only genuine donor records.
- Generate valid JSON output.

## Agent Restrictions

The agent must not:

- Create or invent donor information.
- Include donors with missing contact details.
- Include unavailable donors.
- Include donors who are not eligible to donate.
- Modify source donor records.
- Return malformed JSON.

---

## Expected Workflow

```
Patient Request
      │
      ▼
Load Donor CSV
      │
      ▼
Validate Records
      │
      ▼
Apply Blood Compatibility Rules
      │
      ▼
Filter Eligible Donors
      │
      ▼
Calculate Match Scores
      │
      ▼
Rank Donors
      │
      ▼
Generate JSON Response
```

---

## Future Enhancements

- Distance-based donor matching using GPS coordinates.
- WhatsApp/SMS donor notification.
- Hospital-wise donor preferences.
- AI-based donor response prediction.
- Integration with blood bank management systems.
- Real-time donor availability updates.
- Priority handling for emergency cases.
- Multi-language support.

---

## Use Cases

- Emergency blood requests.
- Hospital blood coordination.
- NGO blood donation drives.
- Blood bank donor identification.
- Rare blood group searches.
- Planned surgeries requiring donor scheduling.

---

**Version:** 1.0  
**Solution Name:** Blood Donor Matching Agent  
**Purpose:** Intelligent donor identification and ranking from CSV-based blood donor databases.