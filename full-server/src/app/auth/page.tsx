"use client";

import { useEffect, useState } from "react";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/${isLogin ? "login" : "register"}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: isLogin ? undefined : username,
                        email,
                        password,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            // Save token (JWT)
            localStorage.setItem("token", data.token);

            // Redirect (example)
            window.location.href = "/home";
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#020617] via-[#020617] to-black text-white">
            <Stars />

            <div className="relative z-10 flex min-h-screen items-center justify-center">
                <div
                    key={isLogin ? "login" : "register"}
                    className="w-[360px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6
                    animate-[slideFadeIn_0.6s_ease-out]"
                >
                    <h2 className="mb-6 text-center text-2xl font-semibold">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>

                    {error && (
                        <p className="mb-3 text-center text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <FloatingInput
                                label="Username"
                                value={username}
                                onChange={setUsername}
                                type="text"
                            />
                        )}

                        <FloatingInput
                            label="Email"
                            value={email}
                            onChange={setEmail}
                            type="email"
                        />

                        <FloatingInput
                            label="Password"
                            value={password}
                            onChange={setPassword}
                            type="password"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full rounded-lg bg-sky-500 py-2 font-medium
                            hover:bg-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]
                            transition-all duration-500 disabled:opacity-60"
                        >
                            {loading
                                ? "Please wait..."
                                : isLogin
                                ? "Login"
                                : "Register"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-300">
                        {isLogin ? "Don’t have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-1 text-sky-400 hover:underline"
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

/* 🔹 Floating Input Component */
function FloatingInput({
    label,
    value,
    onChange,
    type,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type: string;
}) {
    return (
        <div className="relative">
            <input
                type={type}
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder=" "
                className="
                    peer w-full rounded-lg bg-white/10 px-4 pt-5 pb-2
                    text-white outline-none
                    placeholder-transparent
                    focus:ring-2 focus:ring-sky-400
                    transition
                    autofill:bg-white/10
                    autofill:text-white
                "
            />
            <label
                className="
                    pointer-events-none absolute left-4 top-1/2 -translate-y-1/2
                    text-gray-300 transition-all duration-300
                    peer-focus:top-2 peer-focus:text-xs peer-focus:text-sky-400
                    peer-not-placeholder-shown:top-2
                    peer-not-placeholder-shown:text-xs
                "
            >
                {label}
            </label>
        </div>
    );
}

/* 🌠 Stars – FIXED (No hydration issue) */
function Stars() {
    const [stars, setStars] = useState<
        { top: string; left: string; delay: string }[]
    >([]);

    useEffect(() => {
        setStars(
            Array.from({ length: 70 }).map(() => ({
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                delay: `${Math.random() * 5}s`,
            }))
        );
    }, []);

    return (
        <div className="absolute inset-0">
            {stars.map((s, i) => (
                <span
                    key={i}
                    className="absolute block h-[2px] w-[2px] rounded-full bg-white opacity-60 animate-[twinkle_3s_infinite]"
                    style={{
                        top: s.top,
                        left: s.left,
                        animationDelay: s.delay,
                    }}
                />
            ))}
        </div>
    );
}