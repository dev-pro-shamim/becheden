declare module 'jwt-decode' {
  interface JwtDecodeOptions {
    header?: boolean;
  }

  interface JwtHeader {
    typ?: string;
    alg?: string;
    [claim: string]: unknown;
  }

  interface JwtPayload {
    iss?: string;
    sub?: string;
    aud?: string | string[];
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    [claim: string]: unknown;
  }

  export function jwtDecode<T = JwtPayload>(
    token: string,
    options?: JwtDecodeOptions
  ): T extends true ? JwtHeader : T;

  export default jwtDecode;
}
