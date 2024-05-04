
import { Context } from 'koa'

import { CouponRepository, CouponUserRepository } from '../repository'

import { GetCouponDetailDto, GetCouponListDto, GetCouponRecordByUserDto, GetReceivedCouponListDto, ReceiveCouponDto } from '../dto'

export class CouponController {
	public static async find (ctx: Context) {
		const { page, regionId, classifyId } = ctx.query as Partial<GetCouponListDto>

		const res = await CouponRepository.list({
			page: +page, 
			regionId: +regionId, 
			classifyId: +classifyId
		})

		ctx.body = {
			apiCode: 0,
			data: res,
			message: ''
		}
	}

	public static async detail (ctx: Context) {
		const { id } = ctx.query as Partial<GetCouponDetailDto>
		const res = await CouponRepository.detail({
			id
		})

		ctx.body = {
			apiCode: 0,
			data: res,
			message: ''
		}
	}

	public static async receive (ctx: Context) {
		const { userId, couponId } = ctx.request.body as ReceiveCouponDto
	
		const hasReceived = await CouponUserRepository.findById({
			userId,
			couponId
		})

		if (hasReceived) {
			ctx.body = {
				apiCode: 0,
				data: null,
				message: '已经领取过了'
			}
			return
		}

		await CouponUserRepository.add({
			userId,
			couponId
		})

		await CouponRepository.updateReceivedNum({
			couponId
		})

		ctx.body = {
			apiCode: 0,
			data: null,
			message: '领取成功'
		}
	}

	public static async getCouponRecordByUser (ctx: Context) {
		const { userId } = ctx.query as Partial<GetCouponRecordByUserDto>

		const res = await CouponRepository.getCouponRecordByUser({
			userId
		})

		ctx.body = {
			apiCode: 0,
			data: res,
			message: ''
		}
	}

	public static async getReceivedCouponList (ctx: Context) {
		const { userId, type } = ctx.query as Partial<GetReceivedCouponListDto>
		const res = await CouponUserRepository.getReceivedCouponList({
			userId,
			type
		})
		
		ctx.body = {
			apiCode: 0,
			data: res,
			message: ''
		}
	}
}
