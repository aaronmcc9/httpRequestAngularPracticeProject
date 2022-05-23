import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn: 'root' })
export class PostService {
    error = new Subject<string>();
    constructor(private http: HttpClient) { }


    createAndStorePost(title: string, content: string) {
        const postData: Post = {title, content};
        
        this.http.post<{ name: string }>("https://ng-http-practice-4b989-default-rtdb.firebaseio.com/posts.json",
            postData)
            .subscribe(responseData => {
                console.log(responseData);
            },
            error => {
                this.error.next(error.message);
            })
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>("https://ng-http-practice-4b989-default-rtdb.firebaseio.com/posts.json",
        {
            headers: new HttpHeaders({
                'Custom-Header' : 'Summer soon'
            })
        })
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (let key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    deletePosts(){
       return this.http.delete("https://ng-http-practice-4b989-default-rtdb.firebaseio.com/posts.json");
    }
}