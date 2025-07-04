import { Context, Schema } from 'koishi'

import { updateRoleProcess } from './main.js';
import { updateRoleProcesss } from './tg.js';
import { updateRoleProces } from './tgs.js';

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
  ctx.command('升级等级 <userid> <description> 升级某个用户在某个群组中的等级')
    .action(async ({ session }, userid, description) => { 
      const g = await updateRoleProcess(userid, description, config.Groupid, config.Apikey); 
      session.send(g)
    });
  ctx.command('通过申请 <userid> 通过某个用户在某个群组中的申请')
    .action(async ({ session }, userid) => { 
      const g = await updateRoleProcesss(userid, config.Groupid, config.Apikey); 
      session.send(g)
    });
    ctx.command('拒绝申请 <userid> 拒绝某个用户在某个群组中的申请')
    .action(async ({ session }, userid) => { 
      const g = await updateRoleProces(userid, config.Groupid, config.Apikey); 
      session.send(g)
    });
}
