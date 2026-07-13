const venueAddress =
  'Athafy Auditorium, JHQQ+X6H, Vallikkad Varishukkuni Up Rd, Kerala 673106';

export const wedding = {
  groom: {
    name: 'Adil al Qadir',
    father: 'Basheer P',
    mother: 'Raseena',
  },
  bride: {
    name: 'Fairooza Ali',
    father: 'Muhammed Ali',
    mother: 'Fousiya',
  },
  nikkah: {
    dateISO: '2026-12-22T11:00:00+05:30',
    label: '22nd December 2026',
    time: '11:00 AM',
  },
  reception: {
    time: '12:00 PM – 3:00 PM',
  },
  venue: {
    name: 'Athafy Auditorium',
    address: venueAddress,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      venueAddress
    )}`,
  },
  images: {
    heroBg: '/images/couple-portrait.jpg',
    couplePortrait: '/images/couple-portrait.jpg',
    collage: '/images/collage.jpg',
    brideSolo: '/images/bride-solo.jpg',
    coupleClose: '/images/couple-close.jpg',
  },
};
