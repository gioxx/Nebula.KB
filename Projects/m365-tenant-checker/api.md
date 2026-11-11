---
title: 'Microsoft 365 Tenant Checker API'
sidebar_label: 'API'
description: 'Endpoints, parameters and responses.'
sidebar_position: 2
---

- **Endpoint**: `GET /check?domain=<domain>`
- **Parameter**: `domain` (required). Missing parameter → `400 Bad Request`.
- **Typical responses**

| HTTP | found | message                                                                   |
| ---: | :---: | ------------------------------------------------------------------------- |
| 200  | true  | Domain associated with M365; redirect URL returned when available.        |
| 200  | true  | Domain replied 200 but without URL / invalid JSON.                        |
| 404  | false | Domain is not associated with Microsoft 365.                              |
| 400  | null  | Protocol error (missing `Protocol=Autodiscoverv1`) or malformed request.  |
| 500  | null  | Internal error / timeout toward Autodiscover.                             |

**Example**
```bash
curl "http://localhost:5000/check?domain=contoso.com"
```
```json
{
  "domain": "contoso.com",
  "status": 200,
  "found": true,
  "message": "Domain is associated with Microsoft 365. Redirect URL: https://outlook.office365.com/autodiscover/autodiscover.xml"
}
```
