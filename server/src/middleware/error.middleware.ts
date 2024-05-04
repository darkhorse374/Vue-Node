import { Context, Next } from 'koa'

export async function error (ctx: Context, next: Next) {
	try {
		await next()
	} catch (e) {
		console.log('error in middleware: ', e)
		ctx.body = {
			apiCode: 500,
			message: JSON.stringify(e),
			data: null
		}
	}
}