import { CanActivate, ExecutionContext, Injectable, UnauthorizedException,HttpStatus, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {Observable} from 'rxjs'
@Injectable()
export class isCreatorOrAdminGuard implements CanActivate {
        constructor(
        private readonly jwtService:JwtService
        ){ }
    canActivate(
        context:ExecutionContext
    ) : boolean | Promise<boolean> | Observable<boolean>{
        try {
            const req = context.switchToHttp().getRequest()
            const id  = req.params.id
            const adminHeader = req.headers.authorization
            const bearer = adminHeader.split(' ')[0]
            const token = adminHeader.split(' ')[1]
            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({
                    message:"Foydalanuvchi avtorizatsiyadan o'tmagan"
                })
            }
            const admin = this.jwtService.verify(token,{publicKey:process.env.ACCESS_TOKEN_KEY})
            if(admin.is_active !== true || admin.is_admin !== true){
                throw new UnauthorizedException({
                    message:"Xatolik:Unauthorized"
                })
            }
            if(admin.sub !== +id && admin.is_creator !== true) {
                throw new UnauthorizedException({
                    message:"Xatolik! Unauthorized"
                })
            }
            return true
        } catch (error) {
            console.log(error)
            throw new HttpException(
                "Nazarda tutilmagan xatolik",
                HttpStatus.CONFLICT
            )
        }
    }
}