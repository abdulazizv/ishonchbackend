import { CanActivate, ExecutionContext, Injectable, UnauthorizedException,HttpStatus, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {Observable} from 'rxjs'
@Injectable()
export class userParamGuard implements CanActivate {
        constructor(
        private readonly jwtService:JwtService
        ){ }
    canActivate(
        context:ExecutionContext
    ) : boolean | Promise<boolean> | Observable<boolean>{
        try {
            const req = context.switchToHttp().getRequest()
            const userHeader = req.headers.authorization
            if(!userHeader){
                throw new UnauthorizedException({
                    message:"Xatolik ! Not_authorized"
                })
            } 
            const bearer = userHeader.split(' ')[0]
            const token = userHeader.split(' ')[1];
            const id = req.params.id
            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({
                    message:"Foydalanuvchi avtorizatsiyadan o'tmagan"
                })
            }
            try{
               const user = this.jwtService.verify(token,{publicKey:process.env.ACCESS_TOKEN_KEY})
            if(user.is_active !== true){
                throw new UnauthorizedException({
                    message:"Xatolik:Unauthorized"
                })
            } else if(user.sub !== +id){
                throw new UnauthorizedException({
                    message:"Siz faqat o'zingizga ta'sir ko'rsata olasiz"
                })
            }
        }catch(error){
            throw new HttpException(
                "Invalid Signature",
                HttpStatus.NOT_FOUND
            )
        }
            return true
        } catch (error) {
            console.log(error)
            throw new HttpException(
                "Nazarda tutilmagan notAuthorized",
                HttpStatus.CONFLICT
            )
        }
    }
}