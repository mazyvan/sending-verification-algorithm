import * as Joi from 'joi';
import * as dotenv from 'dotenv';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const config = dotenv.config().parsed;
    this.envConfig = this.validateInput(config);
  }

  get port(): number {
    return Number(process.env.PORT);
  }

  get getEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get isApiAuthEnabled(): boolean {
    return Boolean(this.envConfig.API_AUTH_ENABLED);
  }

  get verificationMessage(): string {
    return this.envConfig.VERIFICATION_MESSAGE;
  }

  get successfulVerificationMessage(): string {
    return this.envConfig.SUCCESSFUL_VERIFICATION_MESSAGE;
  }

  get errorVerificationMessage(): string {
    return this.envConfig.ERROR_VERIFICATION_MESSAGE;
  }

  get twilioAccountSID(): string {
    return this.envConfig.TWILIO_ACCOUNT_SID;
  }

  get twilioAuthToken(): string {
    return this.envConfig.TWILIO_AUTH_TOKEN;
  }

  get twilioPhoneNumber(): string {
    return this.envConfig.TWILIO_PHONE_NUMBER;
  }

  get testingTwilioAccountSID(): string {
    return this.envConfig.TESTING_TWILIO_ACCOUNT_SID;
  }

  get testingTwilioAuthToken(): string {
    return this.envConfig.TESTING_TWILIO_AUTH_TOKEN;
  }

  get testingTwilioPhoneNumber(): string {
    return this.envConfig.TESTING_TWILIO_PHONE_NUMBER;
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object including the
   * applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    if (!process.env.PORT) process.env.PORT = '3000';

    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['local', 'development', 'uat', 'staging', 'production'])
        .default('local'),
      PORT: Joi.number().default(3000),
      API_AUTH_ENABLED: Joi.boolean().default(true),
      TWILIO_ACCOUNT_SID: Joi.string().required(),
      TWILIO_AUTH_TOKEN: Joi.string().required(),
      TWILIO_PHONE_NUMBER: Joi.string().default('+12028837958'),
      TESTING_TWILIO_ACCOUNT_SID: Joi.string(),
      TESTING_TWILIO_AUTH_TOKEN: Joi.string(),
      TESTING_TWILIO_PHONE_NUMBER: Joi.string().default('+15005550006'),
      VERIFICATION_MESSAGE: Joi.string().default('Hi! Your verification code is'),
      SUCCESSFUL_VERIFICATION_MESSAGE: Joi.string().default('Hi, you have been verified!'),
      ERROR_VERIFICATION_MESSAGE: Joi.string().default(
        'Hi, the verification code does not match the one we sent to you. Please try again',
      ),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);
    if (error) throw new Error(`Config validation error: ${error.message}`);

    return validatedEnvConfig;
  }
}
