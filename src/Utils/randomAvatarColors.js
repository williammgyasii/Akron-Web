const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5', '#FFC133'];
export const getRandomAvatarColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  