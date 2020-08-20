function myPromise(){
    let self = this;
    self.status = 'pending';
    self.value = null;
    self.rej = null;
    function resovle(value){
        self.value = value;
        self.status = 'resovle';
    }
    function reject(rej){
        self.rej = rej;
        self.status = 'reject'
    }
}
myPromise.prototype.then=function(onResovle,onReject){
    let self = this;
    switch (self.status){
        case 'resovle':
        onResovle(self.value);
        breack;
        case 'reject':
        onResovle(self.rej);
        break;
        default:
    }
}