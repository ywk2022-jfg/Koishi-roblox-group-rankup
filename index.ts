import { Context, Schema } from 'koishi'

import { updateRoleProcess } from './main.js';

export const name = 'roblox-group-rankup'

export interface Config {
  Groupid: string
  Apikey: string
}

export const Config: Schema = Schema.intersect([
  Schema.object({
    Groupid:Schema.string().description('填写你的Roblox群组ID'),
    Apikey:Schema.string().description('填写你的Roblox **个人账号** 的 API Key'),
  })
])

export function apply(ctx: Context, config: Config) { 
  ctx.command('rankup <userid> <description>')
    .action(async ({ session }, userid, description) => { 
      //const testApiKey = 'XfDd0uOsdEOb6n6ut/1EcEI9T25IHgI/uG+cKXqAE5fZyCo8ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkluTnBaeTB5TURJeExUQTNMVEV6VkRFNE9qVXhPalE1V2lJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaVlYTmxRWEJwUzJWNUlqb2lXR1pFWkRCMVQzTmtSVTlpTm00MmRYUXZNVVZqUlVrNVZESTFTVWhuU1M5MVJ5dGpTMWh4UVVVMVpscDVRMjg0SWl3aWIzZHVaWEpKWkNJNklqTXlOell3TmpNM05qRWlMQ0poZFdRaU9pSlNiMkpzYjNoSmJuUmxjbTVoYkNJc0ltbHpjeUk2SWtOc2IzVmtRWFYwYUdWdWRHbGpZWFJwYjI1VFpYSjJhV05sSWl3aVpYaHdJam94TnpRNE1qUXlNek0zTENKcFlYUWlPakUzTkRneU16ZzNNemNzSW01aVppSTZNVGMwT0RJek9EY3pOMzAuUHJtSEhuOEZRR2dVVHlCSWVGRkVLNm9meVRCTjBKRW1IMTgzSjVCQmt4djhJcTFxVV9la0diWmlnR2ViS0hOaHc4YTVuS0p4T2U2d1QzWHppNFVnMEFiRGRpZEhFZDVhUWVkSzBqRmNBMjkxNlFpcTFKc1E3dlN2cEdOc2ktSTFaaXpqdlJjdXRwQVRBb28tLWhqOG04dE1IMThXd1phYzFrcWNwUXl4VXQtRHRNN1hIYkNQZ09TN1lsT1AzWTdDV2ZxZWtBRVlKQUR2QWpCNFU3NjFRUlR1LThSRjJzbmVGemVBSDczSHlyZFl5c1NEb2NiNnR3ZXIxUzFWdHB3MkJReFdMUjhlWVVGRjFpdXJGOFphaUNOWUZVWUFfaGZUNlI4SVZ3YkFIWnNxZlhvbmVnVS05Y3FDSXUtS01UYTR6VnRfWHJMR1JsSUozdGs5TUpTZ2Vn';
      await updateRoleProcess(userid, description, config.Groupid, config.Apikey); 
      session.send('调整成功,请检查群组等级');
    });
}
