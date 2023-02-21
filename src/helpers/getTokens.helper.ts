import { JwtPayload, Tokens } from '../types';

export async function getTokens(
  userId: number,
  is_active: boolean,
  is_admin: boolean,
  is_creator: boolean,
): Promise<Tokens> {
  const jwtPayload: JwtPayload = {
    sub: userId,
    is_active: is_active,
    is_admin: is_admin,
    is_creator: is_creator,
  };
  const [accessToken, refreshToken] = await Promise.all([
    this.jwtService.signAsync(jwtPayload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    }),
    this.jwtService.signAsync(jwtPayload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    }),
  ]);

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
}
