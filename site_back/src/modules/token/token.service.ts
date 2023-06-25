import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { access } from 'fs'
import { CompliteRefreshTokenDto } from './dto'

@Injectable()
export class TokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async generateAccessToken(user) {
		const payLoad = { user }
		const accessToken = this.jwtService.sign(payLoad, {
			secret: process.env.SECRET_KEY,
			expiresIn: '1h',
		})

		return accessToken
	}

	async generateRefreshToken(user) {
		const payLoad = { user }
		const refreshToken = await this.jwtService.sign(payLoad, {
			secret: process.env.SECRET_REFRESH_KEY,
			expiresIn: '30d',
		})

		return refreshToken
	}

	async verifyAccessToken(token: string): Promise<any> {
		try {
			const decoded = this.jwtService.verify(token, {
				secret: process.env.SECRET_KEY,
			})

			return decoded
		} catch (error) {
			console.log(error)
			throw new BadRequestException('Invalid token')
		}
	}

	async verifyRefreshToken(token: string): Promise<any> {
		try {
			const decoded = this.jwtService.verify(token, {
				secret: process.env.SECRET_REFRESH_KEY,
			})

			return decoded
		} catch (error) {
			console.log(error)
			throw new BadRequestException('Invalid token')
		}
	}

	async refreshToken(refresh: string): Promise<CompliteRefreshTokenDto> {
		try {
			const decode = await this.verifyRefreshToken(refresh)
			const user = decode.user
			const accessToken = await this.generateAccessToken(user)

			return { access: accessToken }
		} catch (e) {
			console.log(e)
			throw new BadRequestException('Invalid token')
		}
	}
}
