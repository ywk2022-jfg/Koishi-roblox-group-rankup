import { Context, Schema } from 'koishi'

import { updateRoleProcess } from './main.js';
import { updateRoleProcesss } from './tg.js';
import { updateRoleProces } from './tgs.js';

export const name = 'roblox-group-rankup'

export interface Config {
  Groupid: string
  Apikey: string
  IsGroup: Boolean
}

export const Config: Schema = Schema.intersect([
  Schema.object({
    Groupid:Schema.string().description('填写你的Roblox群组ID'),
    Apikey:Schema.string().description('填写你的Roblox **个人账号** 的 API Key').default("WYUeVaDiCEaUk/xGmo1RF4WOkC/kUAEQqkQyaaTvGFSL2+O2ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkluTnBaeTB5TURJeExUQTNMVEV6VkRFNE9qVXhPalE1V2lJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaVlYTmxRWEJwUzJWNUlqb2lWMWxWWlZaaFJHbERSV0ZWYXk5NFIyMXZNVkpHTkZkUGEwTXZhMVZCUlZGeGExRjVZV0ZVZGtkR1Uwd3lLMDh5SWl3aWIzZHVaWEpKWkNJNklqTXlOell3TmpNM05qRWlMQ0poZFdRaU9pSlNiMkpzYjNoSmJuUmxjbTVoYkNJc0ltbHpjeUk2SWtOc2IzVmtRWFYwYUdWdWRHbGpZWFJwYjI1VFpYSjJhV05sSWl3aVpYaHdJam94TnpVeE5qRTNOekF5TENKcFlYUWlPakUzTlRFMk1UUXhNRElzSW01aVppSTZNVGMxTVRZeE5ERXdNbjAuYk5vMHpGVTMxOVdHeVRJT2Z3eWlneHRnV0pyLUdQajN1NnVuRzJBTjNkeGlqTUJYQkF5bi1PNXpUbUxrMzl2aUQyd1VYVm5ncWY4X3dLZ2F1VjZMelFxVFRKS09vRWJ0ZGVIT3FaeGRFTzNjX3ZTTWt3OXRVNHR4N1ZGRUlCaGdNcFJzV00wVzFqRHc0U0VNWkxHcFdVSlJ4UVJoakZrdFdVeFlwYXliUzRWTGVxZFBXMktNdm9XeXUwRTJQOE5EbVBSRllwUEthdlFVQkNMaEF4V3JMaElQR25LUzFySnJ5YUUtcmM1OHFwak9TaXdzX1pZeU5ycThqaWJadVhnU1JURFpzTjloMWtKVEZldUg5VTI0S0dvUjFQWnYyVHU5SUJGMERVakZWd1lBa0d1dkFHdXhJNnYxTzllZXNqRzR3YklVLTdxRzJJeTV1aTdEQnRlUlR3"),
    IsGroup:Schema.boolean().description('是否开启多群组模式?').default(true),
  })
])

export function apply(ctx: Context, config: Config) { 
  if (config.IsGroup = false) {
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
  }else{
      ctx.command('升级等级 <userid> <description> <Groupid> 升级某个用户在某个群组中的等级')
    .action(async ({ session }, userid, description,Groupid) => { 
      console.log(description)
      const g = await updateRoleProcess(userid, description, Groupid, config.Apikey);
      session.send(g)
    });
  ctx.command('通过申请 <userid> <Groupid> 通过某个用户在某个群组中的申请')
    .action(async ({ session }, userid,Groupid) => { 
      const g = await updateRoleProcesss(userid, Groupid, config.Apikey); 
      session.send(g)
    });
    ctx.command('拒绝申请 <userid> <Groupid> 拒绝某个用户在某个群组中的申请')
    .action(async ({ session }, userid,Groupid) => { 
      const g = await updateRoleProces(userid, Groupid, config.Apikey); 
      session.send(g)
    });
  }
}
