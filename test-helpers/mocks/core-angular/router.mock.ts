import {
  ActivationEnd,
  ActivationStart,
  ChildActivationEnd,
  ChildActivationStart,
  NavigationEnd,
  NavigationExtras,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  RouterEvent,
  Scroll,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';

export declare type Event =
  | RouterEvent
  | RouteConfigLoadStart
  | RouteConfigLoadEnd
  | ChildActivationStart
  | ChildActivationEnd
  | ActivationStart
  | ActivationEnd
  | Scroll;

export class MockRouter {
  private _urlStart: string = '/to-start';
  private _urlEnd: string = '/to-end';

  set urlStart(url: string) {
    this._urlStart = url;
  }
  get urlStart(): string {
    return this._urlStart;
  }

  set urlEnd(url: string) {
    this._urlEnd = url;
  }
  get urlEnd(): string {
    return this._urlEnd;
  }

  public url: string = '/';
  public readonly urlTree: UrlTree;

  public routerLink: any[] | string;
  public routerLinkActive: string[] | string;
  public routerLinkActiveOptions: {
    exact: boolean;
  };

  public events: Observable<Event> = of(
    new NavigationEnd(0, this._urlStart, this._urlEnd),
  );

  public navigate(
    _commands: any[],
    _extras?: NavigationExtras,
  ): Promise<boolean> {
    return Promise.resolve(true);
  }
  public createUrlTree(
    commands: any[],
    navigationExtras?: NavigationExtras,
  ): UrlTree {
    const tree: UrlTree = {} as any;
    return tree;
  }

  public navigateByUrl(
    _url: string | UrlTree,
    _extras?: NavigationExtras,
  ): Promise<boolean> {
    return Promise.resolve(true);
  }
}
