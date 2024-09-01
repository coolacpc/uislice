import { SignUp } from "@clerk/nextjs";

const signUp = () => {
  return (
    <div className={`w-full h-screen  flex justify-center items-center`}>
      <SignUp />
    </div>
  );
};

export default signUp;
