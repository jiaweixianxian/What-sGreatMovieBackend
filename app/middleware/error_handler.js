module.exports=()=>{
    return async function errorHandler(ctx,next) {
        try {
            await next();
        } catch (err) {
            ctx.app.emit('error',err,ctx);
            const status=err.status||500;
            const error =status===500
            ?'Internal Server Error':err.messgae;
            ctx.body={error};
            if(status===422){
                ctx.body.detail=err.errors;
            }
            ctx.status=status;
        }
    }
}