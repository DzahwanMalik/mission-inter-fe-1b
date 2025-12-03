const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-[#181A1CD6] rounded-lg p-6 w-full max-w-[529px] flex gap-8 flex-col justify-between items-center">{children}</div>;
};

export default AuthContainer;
