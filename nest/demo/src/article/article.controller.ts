/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get, Param, Post, Query,Request } from '@nestjs/common';

@Controller('article')
export class ArticleController {

    @Get()
    index():string{
        return '文章页面'
    }

    @Get('add')
    addData(@Query() query):any{
         
        return query
    }

    @Get('edit')
    editData(@Request() req):any {
        //request装饰器获取路由参数
        return req.query
    }

    @Post('create')
    create(@Body() body){
        console.log(body)
        return 'post数据'
    }

    @Get(':id')
    index2(@Param() param){
        console.log('动态路由', param)
        return param
    }
}
