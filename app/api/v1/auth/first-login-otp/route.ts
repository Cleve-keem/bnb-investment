import { resendService } from "@/constants";
import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";
<<<<<<< HEAD

export async function POST() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.user_metadata.id;

  try {
    if (!userId || !user.email) {
      return NextResponse.json(
        { error: "Missing identity payloads." },
        { status: 400 },
      );
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

    await supabase.from("security_otps").delete().eq("user_id", userId);

    const { error: dbError } = await supabase.from("security_otps").insert({
      user_id: userId,
      otp_code: generatedOtp,
      expires_at: expirationTime.toISOString(),
      email: user.email,
    });

    if (dbError) throw new Error(`Database record failure: ${dbError.message}`);

    // 4. Dispatch the completely customized transactional email via Resend
    const { data, error: mailError } = await resendService.emails.send({
      from: "BNB Security Node <onboarding@resend.dev>", // Note: strictly limited to your own account email until domain verification passes
      to: user.email,
      subject:
        "🔒 BNB Security Action Requested: BNB Acceptance Verification Code to proceed",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #ffffff; background-color: #000000; padding: 10px 15px; border-radius: 4px; display: inline-block;">
            <span style="color: #e9ce39;">BNB</span> Investment Trade
          </h2>
          
          <p style="font-size: 15px; color: #111111; line-height: 1.5; margin-top: 16px;">
            Hello ${user.user_metadata.firstName || "Investor"},
          </p>
          
          <p style="font-size: 14px; color: #333333; line-height: 1.5;">
            Thank you for registering your secure trading profile. To finalize your onboarding and activate your investment ledger, your account requires a <strong>Two-Factor Authorization Security Clearance Token</strong>.
          </p>

          <div style="background-color: #fafafa; border-left: 4px solid #dabc17; padding: 15px; margin: 24px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; color: #222222; font-weight: bold;">
              ⚠️ Action Required: Contact Your Account Manager
            </p>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #555555; line-height: 1.4;">
              For regulatory compliance and ledger protection, your 6-digit cryptographic security key must be released manually. Please get in touch with your designated **BNB Investment Account Manager** directly to collect your token sequence.
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #eeeeee; margin-top: 32px;" />
          <p style="font-size: 11px; color: #999999; line-height: 1.5;">
            Secure . Reliable . Trusted <br /> 
            If you did not initiate this registration request, please disregard this automated notification.
          </p>
        </div>
      `,
    });

    if (mailError)
      throw new Error(`Resend transaction rejection: ${mailError.message}`);

    return NextResponse.json({
      success: true,
      message: "Security token matrix dispatched.",
    });
  } catch (error: any) {
    console.error("❌ SEND_OTP_ROUTE_CRASH:", error);

    return NextResponse.json(
      { error: "Failed to send OTP.", details: error.message },
      { status: 500 },
=======
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    // ============================================================
    // 2. Create a server-only Supabase admin client
    // ============================================================

    const adminSupabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    const { data: otp, error: otpError } = await adminSupabase.rpc(
      "prepare_first_login_otp",
      {
        p_user_id: user.id,
      },
    );

    if (otpError) {
      console.error("❌ FIRST_LOGIN_OTP_GENERATION_ERROR:", otpError);

      return NextResponse.json(
        {
          error: otpError.message,
        },
        {
          status: 400,
        },
      );
    }

    if (!otp) {
      return NextResponse.json(
        {
          error: "Unable to generate verification code.",
        },
        {
          status: 500,
        },
      );
    }

    // ============================================================
    // 4. Send OTP through Resend
    // ============================================================

    const firstName =
      user.user_metadata?.firstName ||
      user.user_metadata?.first_name ||
      user.user_metadata?.full_name?.split(" ")[0] ||
      "Investor";

    const { error: mailError } = await resendService.emails.send({
      from: "BNB Security Node <onboarding@resend.dev>",
      to: user.email!,
      subject: "BNB Investment Trade - Login Verification Code",
      html: `
          <div
            style="
              font-family: Arial, sans-serif;
              max-width: 500px;
              margin: 0 auto;
              padding: 24px;
              color: #111111;
            "
          >

            <div
              style="
                background: #000000;
                padding: 14px 18px;
                border-radius: 6px;
                display: inline-block;
                margin-bottom: 20px;
              "
            >
              <span
                style="
                  color: #e9ce39;
                  font-size: 20px;
                  font-weight: 700;
                "
              >
                BNB
              </span>

              <span
                style="
                  color: #ffffff;
                  font-size: 20px;
                  font-weight: 600;
                "
              >
                Investment Trade
              </span>
            </div>

            <h2
              style="
                font-size: 20px;
                margin-bottom: 8px;
              "
            >
              Login Verification
            </h2>

            <p
              style="
                font-size: 14px;
                color: #444444;
                line-height: 1.6;
              "
            >
              Hello ${firstName},
            </p>

            <p
              style="
                font-size: 14px;
                color: #444444;
                line-height: 1.6;
              "
            >
              We detected your first login to your BNB Investment Trade
              account. Use the verification code below to complete your
              secure login.
            </p>

            <div
              style="
                background: #fafafa;
                border: 1px solid #eeeeee;
                border-left: 4px solid #dabc17;
                padding: 20px;
                margin: 24px 0;
                text-align: center;
                border-radius: 6px;
              "
            >
              <p
                style="
                  margin: 0 0 8px 0;
                  font-size: 12px;
                  color: #777777;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                "
              >
                Verification Code
              </p>

              <div
                style="
                  font-size: 32px;
                  font-weight: 700;
                  letter-spacing: 8px;
                  color: #111111;
                "
              >
                ${otp}
              </div>

              <p
                style="
                  margin: 12px 0 0 0;
                  font-size: 12px;
                  color: #777777;
                "
              >
                This code expires in 10 minutes.
              </p>
            </div>

            <p
              style="
                font-size: 13px;
                color: #555555;
                line-height: 1.5;
              "
            >
              If you did not attempt to log in, you can safely ignore this
              email and secure your account if necessary.
            </p>

            <hr
              style="
                border: none;
                border-top: 1px solid #eeeeee;
                margin: 30px 0 20px;
              "
            />

            <p
              style="
                font-size: 11px;
                color: #999999;
                line-height: 1.5;
              "
            >
              Secure · Reliable · Trusted
            </p>

          </div>
        `,
    });

    // ============================================================
    // 5. Handle email failure
    // ============================================================

    if (mailError) {
      console.error("❌ FIRST_LOGIN_OTP_EMAIL_ERROR:", mailError);

      return NextResponse.json(
        {
          error: "Verification code was generated but could not be sent.",
        },
        {
          status: 500,
        },
      );
    }

    // ============================================================
    // 6. Success
    // ============================================================
    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully.",
    });
  } catch (error: any) {
    console.error("❌ FIRST_LOGIN_OTP_ROUTE_CRASH:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to prepare login verification.",
      },
      {
        status: 500,
      },
>>>>>>> a95b394fd1337c90b10cec3199ac4df4eedf08ad
    );
  }
}
