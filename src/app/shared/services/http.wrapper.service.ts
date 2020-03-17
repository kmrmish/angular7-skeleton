import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { get as _get, merge as _merge } from 'lodash';
import { getApiHostName } from '../../../environments/environment';
import { Deferred } from '../models/deffered';


@Injectable({
    providedIn: 'root'
})
export class HttpWrapperService {

    defaultOptions: any;
    hostName: string;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        const that = this;

        this.hostName = '';
        this.defaultOptions = (() => {
            return {
                url: '',
                data: '',
                showOnSuccess: true,
                showOnFailure: true,
                disableNotification: false,
                success(deffered, result, def) {

                    let data: any = {};
                    let msg = '';

                    try {
                        data = JSON.parse(result).data;
                        msg = JSON.parse(result).message;
                    } catch (e) {

                    } finally {

                        if (def.showOnSuccess && msg && msg.length > 0) {
                            if (!def.disableNotification && def.method !== 'Get') {
                                // this._message.success(msg);
                            }
                        }

                        // tslint:disable-next-line: no-unsafe-finally
                        return deffered.resolve(result.data);
                    }
                },
                error(deffered, result, def) {
                    let errorMessage;

                    try {
                        errorMessage = _get(result, 'error.message', 'Some Error Occurred');
                    } catch (e) {
                        errorMessage = 'Some Error Occurred';
                    } finally {
                        if (_get(result.error, 'validationFailures', false) && Array.isArray(result.error.validationFailures)) {
                            // result.validationFailures.forEach((msg) => {
                            // this._message.error(msg);
                            // });
                            return deffered.reject(result.error);
                        }

                        // In case of any Aun-authenticated requests, such delete to cookie, go to login page and reload
                        if (result && result.status && result.status === 401) {
                            that.router.navigate(['/app/auth/login']);
                            // that.window.nativeWindow.location.reload();
                        }

                        // tslint:disable-next-line: no-unsafe-finally
                        return deffered.reject(errorMessage);
                    }
                }
            };
        });
    }

    httpRequestOptions(defaultOptions): any {
        const headers = new Headers();
        // headers.set('Content-Type', 'application/json; charset=utf-8');
        const output: any = _merge({}, { headers }, defaultOptions);

        // const token = this.localStorage.getToken();
        // if (token != null) {
        //     output.headers.authorization = this.localStorage.getToken();
        // }

        if (_get(defaultOptions, 'headers.skipfullpageloader', false)) {
            output.headers.skipfullpageloader = 'true';
        }

        return output;
    }

    generateUrl(opts: any): string {
        const { url } = opts;
        const u = getApiHostName() + url;
        return u;
        // return this.hostName + opts.url;
    }

    get(opts: any): Promise<any> {
        const deferred = new Deferred<any>();
        const def = Object.assign(this.defaultOptions(), opts);
        const options = this.httpRequestOptions(def);

        this.http.get(this.generateUrl(def), options)
            .subscribe(
                (data) => {
                    return def.success(deferred, data, def);
                },
                (error) => {
                    return def.error(deferred, error, def);
                }
            );

        return deferred.promise;
    }

    delete(opts: any): Promise<any> {
        const deferred = new Deferred<any>();
        const def = Object.assign(this.defaultOptions(), opts);
        const options = this.httpRequestOptions(def);

        this.http.delete(this.generateUrl(def), options)
            .subscribe(
                (data) => {
                    return def.success(deferred, data, def);
                },
                (error) => {
                    return def.error(deferred, error, def);
                }
            );

        return deferred.promise;
    }

    post(opts: any): Promise<any> {
        const deferred = new Deferred<any>();
        const def = Object.assign(this.defaultOptions(), opts);
        const options = this.httpRequestOptions(def);

        this.http.post(this.generateUrl(def), def.data, options)
            .subscribe(
                (data) => {
                    return def.success(deferred, data, def);
                },
                (error) => {
                    return def.error(deferred, error, def);
                }
            );

        return deferred.promise;
    }

    put(opts: any): Promise<any> {
        const deferred = new Deferred<any>();
        const def = Object.assign(this.defaultOptions(), opts);
        const options = this.httpRequestOptions(def);

        this.http.put(this.generateUrl(def), def.data, options)
            .subscribe(
                (data) => {
                    return def.success(deferred, data, def);
                },
                (error) => {
                    return def.error(deferred, error, def);
                }
            );

        return deferred.promise;
    }

    patch(opts: any): Promise<any> {
        const deferred = new Deferred<any>();
        const def = Object.assign(this.defaultOptions(), opts);

        this.http.patch(this.generateUrl(def), def.data)
            .subscribe(
                (data) => {
                    return def.success(deferred, data, def);
                },
                (error) => {
                    return def.error(deferred, error, def);
                }
            );

        return deferred.promise;
    }

    upload(opts: any): Promise<any> {
        const deferred = new Deferred<any>();
        const def = Object.assign(this.defaultOptions(), opts);

        this.http.post(this.generateUrl(def), def.formData)
            .subscribe(
                (data) => {
                    return def.success(deferred, data, def);
                },
                (error) => {
                    return def.error(deferred, error, def);
                }
            );

        return deferred.promise;
    }

}
