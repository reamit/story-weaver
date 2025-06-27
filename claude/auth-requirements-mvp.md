# MVP Authentication Requirements

## Overview
Simple email-based login for parents. No passwords, no verification - just email entry to access account.

## Core Flow
1. **Login Screen**: Single email input field
2. **Submit**: Enter email and press login
3. **Account Access**: 
   - Existing email → Load parent account
   - New email → Create parent account
4. **Dashboard**: Parent lands on dashboard to manage children profiles

## Technical Requirements

### Frontend
- Single login page with email input
- Email format validation (client-side)
- Loading state during login
- Error handling for network issues
- Redirect to parent dashboard after login

### Backend
- **POST /api/auth/login**
  - Input: `{ email: string }`
  - Validate email format
  - Check if email exists in database
  - Create new parent account if not exists
  - Generate session token
  - Return: `{ success: boolean, token: string, isNewUser: boolean }`

### Database Schema
```sql
parents: 
  - id (uuid)
  - email (unique)
  - created_at
  - last_login

sessions:
  - id
  - parent_id
  - token
  - created_at
  - expires_at (30 days)

children: (for later)
  - id
  - parent_id
  - name
  - age
  - preferences
  - created_at
```

## Implementation

### Login Component
```typescript
// Simple email input with submit
- Email input field
- "Continue" button
- Basic email validation
- Error message display
```

### API Route
```typescript
POST /api/auth/login
- Validate email format
- Find or create parent by email
- Create session token
- Return token and user status
```

### Session Management
- Store token in httpOnly cookie
- 30-day session expiry
- Auto-refresh on activity
- Clear session on browser close (optional)

## Security Considerations
- HTTPS only
- Rate limiting (10 attempts per email per hour)
- Secure session tokens
- No sensitive data in localStorage

## User Experience
- Clean, minimal login screen
- Clear "Continue with Email" button
- Instant login (no email verification)
- Remember last logged in email (optional)
- Direct access to parent dashboard

## Environment Variables
```
SESSION_SECRET=<random-string>
SESSION_DURATION_DAYS=30
```

## Next Steps
After parent login is complete:
1. Parent dashboard design
2. Child profile creation flow
3. Child profile data model
4. Profile switching UI