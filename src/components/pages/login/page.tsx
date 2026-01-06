import { cn } from "cn-func";
import { modalLogo } from "../../../assets";

const LoginPage = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "w-dvw min-h-dvh bg-blue-tertiary"
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-5",
          "max-w-[574px] w-full p-20 bg-white rounded-[20px]",
          "shadow-lg"
        )}
      >
        <img src={modalLogo} alt="Logo" width={208} />
        <form
          className={cn(
            "flex flex-col gap-6",
            "w-full min-w-80 max-w-[420px] p-6 bg-white",
            "border border-gray-light rounded-xl",
            ""
          )}
        >
          <div className="flex flex-col gap-2">
            <label>아이디</label>
            <input
              name="id"
              type="text"
              placeholder="아이디를 입력해주세요."
              className="w-full px-4 py-3 border border-gray-light rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>비밀번호</label>
            <input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="w-full px-4 py-3 border border-gray-light rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-primary text-white p-3 rounded-lg"
          >
            로그인
          </button>
          <button className="text-blue-primary underline text-xs">
            비밀번호를 잊으셨나요?
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
