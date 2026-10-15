import { Img } from 'react-email';

const logoStyle = {
  marginBottom: '40px',
};

export const Logo = () => {
  return (
    <Img
      src="https://app.closeai.pt/images/icons/android/android-launchericon-192-192.png"
      alt="CloseAI"
      width="40"
      height="40"
      style={logoStyle}
    />
  );
};
