"use client";

import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, QrCode, Key, Lock, CheckCircle2, X } from "lucide-react";

interface GoogleOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified?: () => void;
}

export const GoogleOtpModal: React.FC<GoogleOtpModalProps> = ({
  isOpen,
  onClose,
  onVerified,
}) => {
  const [otpCode, setOtpCode] = useState<string>("");
  const [otpEnabled, setOtpEnabled] = useState<boolean>(true);
  const [verifiedSuccess, setVerifiedSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      setVerifiedSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        onVerified?.();
        onClose();
        setVerifiedSuccess(false);
        setOtpCode("");
      }, 1200);
    } else {
      setErrorMessage("구글 OTP 앱의 6자리 인증번호를 정확히 입력하세요.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-md shadow-blue-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Google Authenticator 2차 인증
          </h3>
          <p className="text-xs text-slate-500">
            소중한 보관 짐과 고가 물품 매입 보안을 위해 구글 OTP 6자리를 입력하세요.
          </p>
        </div>

        {/* Verification Form */}
        {verifiedSuccess ? (
          <div className="py-8 text-center space-y-2 text-emerald-600 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 mx-auto animate-bounce" />
            <h4 className="text-base font-bold">2단계 보안 인증 통과!</h4>
            <p className="text-xs text-slate-500">안전하게 작업을 완료합니다.</p>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
                스마트폰 구글 OTP 6자리 번호
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                placeholder="• • • • • •"
                className="w-full text-center text-2xl tracking-[0.5em] font-mono py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                autoFocus
              />
              {errorMessage && (
                <p className="text-xs text-rose-500 font-medium text-center mt-2">
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={otpCode.length !== 6}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white font-black text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>인증 확인 및 승인</span>
            </button>

            {/* QR Setup Helper */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-slate-400" />
                OTP 처음 등록하시나요?
              </span>
              <button
                type="button"
                onClick={() =>
                  alert(
                    "[구글 OTP 등록 가이드]\n1. 스마트폰에서 'Google Authenticator' 앱 설치\n2. '+' 버튼 누르고 QR코드 스캔\n3. 생성된 6자리 번호를 입력하시면 등록이 완료됩니다."
                  )
                }
                className="text-blue-600 font-bold hover:underline"
              >
                QR 설정 가이드 보기
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
