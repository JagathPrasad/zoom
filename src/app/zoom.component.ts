import { Component } from '@angular/core';
import { MeetingService } from './app.service';
declare var ZoomMtg;

ZoomMtg.setZoomJSLib("https://source.zoom.us/1.6.1/lib", "/av")
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
    selector: 'zoom'
    , templateUrl: './zoom.html'
})
export class ZoomComponent {



    constructor(private service: MeetingService) {
        //this.SetConfig(98490046909);

    }

    // SetConfig(meetingNumber: any) {

    //     this.meetConfig = {
    //         apiKey: 'YrCQqImHylkgMVmMRGhbHMSHAN9z0C0p9U4d',
    //         apiSecret: 'wmrSaqnf9ARaBKh4lYPOSBIDL6WU0NFwjO2f',
    //         meetingNumber: meetingNumber,
    //         userName: 'Jagath',
    //         passWord: '',
    //         leaveUrl: "http://localhost:4200",
    //         role: 0
    //     };

    //     this.signature = ZoomMtg.generateSignature({
    //         meetingNumber: this.meetConfig.meetingNumber,
    //         apiKey: this.meetConfig.apiKey,
    //         apiSecret: this.meetConfig.apiSecret,
    //         role: this.meetConfig.role,
    //         success: function (res) {
    //             console.log(res.result);
    //         }
    //     });

    //     ZoomMtg.init({

    //         showMeetingHeader: false, //option
    //         disableInvite: true, //optional
    //         disableCallOut: true, //optional
    //         disableRecord: true, //optional
    //         disableJoinAudio: true, //optional
    //         audioPanelAlwaysOpen: true, //optional
    //         showPureSharingContent: false, //optional
    //         isSupportAV: true, //optional,
    //         isSupportChat: true, //optional,
    //         isSupportQA: true, //optional,
    //         isSupportCC: true, //optional,
    //         screenShare: true, //optional,
    //         rwcBackup: '', //optional,
    //         videoDrag: true, //optional,
    //         // sharingMode: 'both', //optional,
    //         videoHeader: true, //optional,
    //         isLockBottom: false, // optional,
    //         isSupportNonverbal: true, // optional,
    //         isShowJoiningErrorDialog: true, // optional,
    //         // inviteUrlFormat: '', // optional
    //         // loginWindow: {  // optional,
    //         //     width: 400,
    //         //     height: 380
    //         // }
    //         leaveUrl: 'http://localhost:4200',
    //         success: (res) => {
    //             ZoomMtg.join({
    //                 meetingNumber: this.meetConfig.meetingNumber,
    //                 userName: this.meetConfig.userName,
    //                 signature: this.signature,
    //                 apiKey: this.meetConfig.apiKey,
    //                 userEmail: 'jagathprasad0@gmail.com',//'',
    //                 passWord: this.meetConfig.passWord,//'',
    //                 success: (res) => {
    //                     console.log('join meeting success');
    //                 },
    //                 error: (res) => {
    //                     console.log(res);
    //                 }
    //             });
    //         },
    //         error: (res) => {
    //             console.log('error in zoom');
    //             console.log(res);
    //         }
    //     });

    // }


    public signature: any;
    meetConfig = {
        apiKey: 'YrCQqImHylkgMVmMRGhbHMSHAN9z0C0p9U4d',
        apiSecret: 'wmrSaqnf9ARaBKh4lYPOSBIDL6WU0NFwjO2f',
        meetingNumber: 2829261127,
        userName: 'Jagath',
        passWord: '',
        leaveUrl: "http://localhost:4200",
        role: 0
    };

    // signature = ZoomMtg.generateSignature({
    //     meetingNumber: this.meetConfig.meetingNumber,
    //     apiKey: this.meetConfig.apiKey,
    //     apiSecret: this.meetConfig.apiSecret,
    //     role: this.meetConfig.role,
    //     success: function (res) {
    //         console.log(res.result);
    //     }
    // });


    ngOnInit() {
        //var meetingNumber = this.meetConfig.meetingNumber.toString();
        //var role = this.meetConfig.role.toString();
        debugger;
        //this.signature = this.GenerateSignature(this.meetConfig.apiKey, this.meetConfig.apiSecret, meetingNumber, role);
        console.log('nginit');
        //this.GenerateSignature('2yzPz2hSSBed5goA3GkEdw', '85oJnK0XphXN3NjJ9rDVf8IUCfgO2inuHjTC', '99449287319', '0');
        this.GenerateSignature('YrCQqImHylkgMVmMRGhbHMSHAN9z0C0p9U4d', 'wmrSaqnf9ARaBKh4lYPOSBIDL6WU0NFwjO2f', '2829261127', '0');
        //this.ZoomCall();
        // ZoomMtg.init({
        //     leaveUrl: 'http://localhost:4200',
        //     isSupportAV: true,
        //     success: (res) => {
        //         ZoomMtg.join({
        //             meetingNumber: this.meetConfig.meetingNumber,
        //             userName: this.meetConfig.userName,
        //             signature: this.signature,
        //             apiKey: this.meetConfig.apiKey,
        //             userEmail: 'jagathprasad0@gmail.com',//'',
        //             passWord: this.meetConfig.passWord,//'',
        //             success: (res) => {
        //                 console.log('join meeting success');
        //             },
        //             error: (res) => {
        //                 console.log(res);
        //                 console.log('this.signature', this.signature);
        //             }
        //         });
        //     },
        //     error: (res) => {
        //         console.log('error in zoom');
        //         console.log(res);
        //         console.log('this.signature', this.signature);
        //     }
        // });
    }

    public GenerateSignature(apiKey: string, apiSecret: string, meetingNumber: string, role: string) {

        //I have attached the file app.cs, how I have created my generate token in c# service.
        this.service.GetGenerateToken(apiKey, apiSecret, meetingNumber, role).subscribe(x => {
            this.signature = x;
            console.log('this.signature', this.signature);
            ZoomMtg.init({
                leaveUrl: 'http://localhost:4200',
                isSupportAV: true,
                success: (res) => {
                    ZoomMtg.join({
                        meetingNumber: this.meetConfig.meetingNumber,
                        userName: this.meetConfig.userName,
                        signature: this.signature,
                        apiKey: this.meetConfig.apiKey,
                        userEmail: 'preeline01@gmail.com',//'',
                        passWord: this.meetConfig.passWord,//'',
                        success: (res) => {
                            console.log('join meeting success');
                        },
                        error: (res) => {
                            console.log(res);
                            console.log('this.signature', this.signature);
                        }
                    });
                },
                error: (res) => {
                    console.log('error in zoom');
                    console.log(res);
                    console.log('this.signature', this.signature);
                }
            });
        });

    }
}