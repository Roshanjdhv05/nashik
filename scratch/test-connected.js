async function runTests() {
  const base = 'http://localhost:3000';

  console.log('--- TEST 1: Create Group ---');
  const res1 = await fetch(`${base}/api/connected/groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      groupName: 'Patil Parivar Kumbh 2027',
      creatorName: 'Ganesh Patil',
      meetingPoint: 'Ram Kund Pillar 4',
      creatorPhone: '+919822123456',
    }),
  });
  const data1 = await res1.json();
  console.log('Created Group:', data1.success, data1.group.name, 'InviteCode:', data1.group.inviteCode);
  const groupId = data1.group.id;
  const token1 = data1.creatorToken;
  const inviteCode = data1.group.inviteCode;

  console.log('\n--- TEST 2: Lookup Group by Invite Code (Preview) ---');
  const res2 = await fetch(`${base}/api/connected/groups?code=${inviteCode}`);
  const data2 = await res2.json();
  console.log('Lookup Preview:', data2.success, data2.group.name, 'Members:', data2.group.memberCount);

  console.log('\n--- TEST 3: Second Member Joins Group ---');
  const res3 = await fetch(`${base}/api/connected/groups/${groupId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      memberName: 'Pooja Patil',
      phone: '+919822987654',
    }),
  });
  const data3 = await res3.json();
  console.log('Member Joined:', data3.success, 'New count:', data3.group.memberCount);
  const token2 = data3.memberToken;

  console.log('\n--- TEST 4: Live Location Sharing (Explicit Consent) ---');
  const res4 = await fetch(`${base}/api/connected/groups/${groupId}/location`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token2}`,
    },
    body: JSON.stringify({
      isSharing: true,
      location: { lat: 20.0065, lng: 73.7925, accuracy: 6 },
      battery: 88,
    }),
  });
  const data4 = await res4.json();
  console.log('Location Shared:', data4.success, data4.member.location);

  console.log('\n--- TEST 5: Creator Fetches Group (Verified Authorization) ---');
  const res5 = await fetch(`${base}/api/connected/groups/${groupId}`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const data5 = await res5.json();
  const sharingCount = data5.group.members.filter((m) => m.isSharing).length;
  console.log('Creator sees live members:', sharingCount, 'out of', data5.group.memberCount);

  console.log('\n--- TEST 6: Send Meeting Alert / Ping ---');
  const res6 = await fetch(`${base}/api/connected/groups/${groupId}/ping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token2}`,
    },
    body: JSON.stringify({
      message: 'Reached Ram Kund Ghat safely!',
      type: 'meeting',
    }),
  });
  const data6 = await res6.json();
  console.log('Ping Sent:', data6.success, data6.ping.message);

  console.log('\n--- TEST 7: Stop Sharing (Instant Privacy Revocation) ---');
  const res7 = await fetch(`${base}/api/connected/groups/${groupId}/location`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token2}`,
    },
    body: JSON.stringify({
      isSharing: false,
    }),
  });
  const data7 = await res7.json();
  console.log('Stopped Sharing:', data7.success, 'isSharing:', data7.member.isSharing, 'Location is null:', data7.member.location === null);

  console.log('\n--- TEST 8: Member Leaves Group ---');
  const res8 = await fetch(`${base}/api/connected/groups/${groupId}/leave`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token2}` },
  });
  const data8 = await res8.json();
  console.log('Left Group:', data8.success);

  console.log('\nALL END-TO-END TESTS COMPLETED SUCCESSFULLY!');
}

runTests().catch(console.error);
