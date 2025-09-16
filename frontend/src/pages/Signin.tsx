// Signin.tsx
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white dark:bg-[#232323] rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-hidden animate-fade-in relative z-10">
        <div className="flex-1 flex items-center justify-center p-10">
          <Auth type="signin" />
        </div>
        <div className="hidden lg:block flex-1 bg-slate-50 dark:bg-[#181818]">
          <Quote />
        </div>
      </div>
    </div>
  );
};
