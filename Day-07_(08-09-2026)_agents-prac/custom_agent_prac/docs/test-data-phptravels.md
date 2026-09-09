# Test Data for phptravels.net

## 1. Search Form Data

```ts
export const searchFormData = {
  validDestination: 'Dubai',
  validHotelName: 'Marina Bay Hotel',
  emptyDestination: '',
  whitespaceDestination: '   ',
  invalidDestination: '@@@',
  longDestination: 'D'.repeat(255),
  validCheckIn: '2026-10-10',
  validCheckOut: '2026-10-15',
  invalidCheckOutBeforeCheckIn: '2026-10-08',
  sameDayStay: '2026-10-10',
  guestCount: 2,
  roomCount: 1,
  maxGuestCount: 8,
  maxRoomCount: 6,
};
```

## 2. Valid and Invalid Search Cases

```ts
export const searchValidationCases = [
  {
    destination: 'Dubai',
    checkIn: '2026-10-10',
    checkOut: '2026-10-15',
    guests: 2,
    rooms: 1,
    expected: 'success'
  },
  {
    destination: '',
    checkIn: '2026-10-10',
    checkOut: '2026-10-15',
    guests: 2,
    rooms: 1,
    expected: 'destination required'
  },
  {
    destination: '   ',
    checkIn: '2026-10-10',
    checkOut: '2026-10-15',
    guests: 2,
    rooms: 1,
    expected: 'destination required'
  },
  {
    destination: 'Dubai',
    checkIn: '2026-10-15',
    checkOut: '2026-10-10',
    guests: 2,
    rooms: 1,
    expected: 'invalid date range'
  },
  {
    destination: 'D'.repeat(255),
    checkIn: '2026-10-10',
    checkOut: '2026-10-15',
    guests: 2,
    rooms: 1,
    expected: 'validation or long input handling'
  }
];
```

## 3. Hotel Listing Data

```ts
export const hotelListingData = {
  validHotel: {
    name: 'Marina Bay Hotel',
    location: 'Dubai',
    price: 180,
    currency: 'USD',
    rating: 4.8
  },
  missingPriceHotel: {
    name: 'Test Hotel',
    location: 'Dubai',
    price: null,
    currency: 'USD',
    rating: 4.2
  },
  incompleteHotel: {
    name: '',
    location: 'Dubai',
    price: 0,
    currency: 'USD',
    rating: null
  },
  duplicateHotelName: 'Marina Bay Hotel',
  longHotelName: 'H'.repeat(200),
  specialCharHotelName: 'Hotel @ #$%^&*()'
};
```

## 4. Booking Flow Data

```ts
export const bookingFlowData = {
  validGuest: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1-555-123-4567'
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1-555-123-4567'
  },
  invalidEmail: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'invalid-email',
    phone: '+1-555-123-4567'
  },
  invalidPhone: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: 'abc'
  },
  longName: {
    firstName: 'J'.repeat(100),
    lastName: 'S'.repeat(100),
    email: 'long.name@example.com',
    phone: '+1-555-000-0000'
  }
};
```

## 5. Security and Injection Payloads

```ts
export const securityInputData = [
  "' OR '1'='1",
  '<script>alert(1)</script>',
  '"; drop table users; --',
  '../../etc/passwd',
  '<img src=x onerror=alert(1)>',
  '<svg/onload=alert(1)>',
  'admin\nadmin',
  'SELECT * FROM users WHERE name = "admin"',
  'javascript:alert(1)',
  '1; rm -rf /'
];
```

## 6. Boundary and Edge Cases

```ts
export const boundaryInputData = {
  emptyString: '',
  whitespaceOnly: '   ',
  minLengthText: 'a',
  maxLengthText: 'x'.repeat(255),
  singleGuest: 1,
  multiGuest: 4,
  singleRoom: 1,
  multiRoom: 5,
  sameDayCheckInOut: '2026-10-10',
  nearBoundaryDate: '2026-12-31',
  unicodeText: 'mañana-测试-مرحبا',
  specialCharacters: '!@#$%^&*()_+-=[]{}|;:,.<>?~'
};
```

## 7. Duplicate and Repeated Data

```ts
export const duplicateData = {
  duplicateHotelNames: ['Marina Bay Hotel', 'Marina Bay Hotel', 'Marina Bay Hotel'],
  duplicateEmails: ['john.smith@example.com', 'john.smith@example.com'],
  duplicateDestinations: ['Dubai', 'Dubai', 'Dubai']
};
```

## 8. Demo and Warning Message Data

```ts
export const demoMessageData = {
  expectedWarnings: [
    'demo',
    'sandbox',
    'test mode',
    'not a live booking',
    'no real payment'
  ],
  negativeWarnings: [
    'live payment',
    'confirmed purchase',
    'real checkout processing'
  ]
};
```

## 9. Admin / Configuration Data

```ts
export const adminConfigData = {
  validApiKey: 'demo_api_key_123456',
  maskedApiKey: '************123456',
  emptyApiKey: '',
  invalidApiKey: 'short',
  validSupplierName: 'Travel Supplier Demo',
  invalidSupplierName: '!@#$%'
};
```

## 10. Suggested Data Usage Mapping

```ts
export const dataUsageMap = {
  homepageValidation: ['searchFormData', 'demoMessageData'],
  searchValidation: ['searchValidationCases', 'searchFormData'],
  hotelResults: ['hotelListingData', 'duplicateData'],
  bookingFlow: ['bookingFlowData', 'demoMessageData'],
  securityScenarios: ['securityInputData', 'adminConfigData'],
  boundaryTesting: ['boundaryInputData', 'searchValidationCases']
};
```
