import { Component } from '@angular/core';
import { MeetingService } from './app.service';
//declare var ZoomMtg;
import {ZoomMtg} from '@zoomus/websdk'
//ZoomMtg.setZoomJSLib("https://source.zoom.us/1.6.1/lib", "/av")
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
        apiKey: '2yzPz2hSSBed5goA3GkEdw',
        apiSecret: '85oJnK0XphXN3NjJ9rDVf8IUCfgO2inuHjTC',
        meetingNumber: 2829261127,
        userName: 'Jagath',
        passWord: '',
        leaveUrl: "http://localhost:4200/",
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

        

        console.log('nginit');

        //Type 1
        //this.GenerateSignature('YrCQqImHylkgMVmMRGhbHMSHAN9z0C0p9U4d', '19GaJUFF41rd9SX5m5Um0jPfJ8NYMxn0a1Sb', '2829261127', '0');
        //error attached in the repository.

       // Type 2
        ZoomMtg.generateSignature({
            meetingNumber: this.meetConfig.meetingNumber,
            apiKey: this.meetConfig.apiKey,
            apiSecret: this.meetConfig.apiSecret,
            role: this.meetConfig.role,
            success: function (res) {
                console.log(res.result);
                this.signature = res.result;
                //let m = this.meetConfig.meetingNumber;
                let sig = res.result;
                ZoomMtg.init({
                    leaveUrl: 'http://localhost:4200/',
                    isSupportAV: true,
                    success: (res) => {
                        console.log('1');
                        ZoomMtg.join({
                            meetingNumber: 2829261127,
                            userName: 'Jagath',
                            signature: sig,
                            apiKey: '2yzPz2hSSBed5goA3GkEdw',
                            userEmail: '',//'',
                            passWord: '',
                            success: (res) => {
                                console.log('join meeting success');
                                console.log('2');
                            },
                            error: (res) => {
                                console.log('error',res);
                                console.log('this.signature', sig);
                                console.log('3');
                            }
                        });
                    },
                    error: (res) => {
                        console.log('error in zoom');
                        console.log(res);
                        console.log('this.signature', this.signature);
                        console.log('4');
                    }
                });
            }
        });


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
                            console.log('error',res);
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