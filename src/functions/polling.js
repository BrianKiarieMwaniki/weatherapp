export const calculateTimeUntilNextPoll = () => {
  const now = new Date();
  let nextPollTime = new Date(now);
  nextPollTime.setHours(now.getHours() + 1, 0, 0, 0); // Set next poll time to the next hour

  const timeUntilNextPoll = nextPollTime - now;
  return timeUntilNextPoll;
};