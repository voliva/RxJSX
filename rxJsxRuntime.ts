import * as RxJS from "rxjs";
import * as operators from "rxjs/operators";

declare global {
  namespace obs.JSX {
    interface ElementChildrenAttribute {
      children: {};
    }
    interface IntrinsicElements {
      /// Special
      pipe: {
        source$: RxJS.Observable<any> | Element;
        children: Element | Element[];
      };

      /// Creation
      combineLatest: {};
      concat: {};
      forkJoin: {};
      merge: {};
      race: {};
      zip: {};
      from: {
        input: RxJS.ObservableInput<any>;
      };
      interval: {
        period: number;
      };
      of: {
        value: any;
      };
      timer: {
        dueTime: number;
        period?: number;
      };

      /// Operators
      map: {
        mapFn: (value: any, index: number) => any;
      };
      filter: {
        filterFn: (value: any) => boolean;
      };
      debounceTime: {
        dueTime: number;
      };
      delay: {
        delay: number | Date;
      };
      distinctUntilChanged: {
        compareFn?: (a: any, b: any) => boolean;
      };
      ignoreElements: {};
      scan: {
        accumulator: (acc: any, value: any) => any;
        seed?: any;
      };
      share: {};
      skip: {
        count: number;
      };
      switchMap: {
        children: (value: any, index: number) => RxJS.Observable<any> | Element;
      };
      take: {
        count: number;
      };
      tap: {
        next?: (v: any) => void;
        error?: (e: any) => void;
        complete?: () => void;
      };
      withLatestFrom: {
        children: RxJS.Observable<any> | Element;
      };

      // audit: {};
      // auditTime: {};
      // buffer: {};
      // bufferCount: {};
      // bufferTime: {};
      // bufferToggle: {};
      // bufferWhen: {};
      // catchError: {};
      // combineAll: {};
      // concatAll: {};
      // concatMap: {};
      // concatMapTo: {};
      // count: {};
      // debounce: {};
      // defaultIfEmpty: {};
      // delayWhen: {};
      // dematerialize: {};
      // distinct: {};
      // distinctUntilKeyChanged: {};
      // elementAt: {};
      // endWith: {};
      // every: {};
      // exhaust: {};
      // exhaustMap: {};
      // expand: {};
      // finalize: {};
      // find: {};
      // findIndex: {};
      // first: {};
      // groupBy: {};
      // isEmpty: {};
      // last: {};
      // mapTo: {};
      // materialize: {};
      // max: {};
      // mergeAll: {};
      // mergeMap: {};
      // mergeMapTo: {};
      // mergeScan: {};
      // min: {};
      // multicast: {};
      // observeOn: {};
      // onErrorResumeNext: {};
      // pairwise: {};
      // partition: {};
      // pluck: {};
      // publish: {};
      // publishBehavior: {};
      // publishLast: {};
      // publishReplay: {};
      // reduce: {};
      // repeat: {};
      // repeatWhen: {};
      // retry: {};
      // retryWhen: {};
      // refCount: {};
      // sample: {};
      // sampleTime: {};
      // sequenceEqual: {};
      // shareReplay: {};
      // single: {};
      // skipLast: {};
      // skipUntil: {};
      // skipWhile: {};
      // startWith: {};
      // subscribeOn: {};
      // switchAll: {};
      // switchMapTo: {};
      // takeLast: {};
      // takeUntil: {};
      // takeWhile: {};
      // throttle: {};
      // throttleTime: {};
      // throwIfEmpty: {};
      // timeInterval: {};
      // timeout: {};
      // timeoutWith: {};
      // timestamp: {};
      // toArray: {};
      // window: {};
      // windowCount: {};
      // windowTime: {};
      // windowToggle: {};
      // windowWhen: {};
      // zipAll: {};
    }
    interface Element {
      asObservable<T = any>(): RxJS.Observable<T>;
      asOperator<T = any, R = any>(): RxJS.OperatorFunction<T, R>;
    }
  }
}

export const obs = (
  element: keyof obs.JSX.IntrinsicElements,
  props: any,
  ...children: any
) => {
  switch (element) {
    case "pipe":
      return jsxObservableElement(props.source$.pipe(...children));

    case "combineLatest":
    case "forkJoin":
      return jsxObservableElement((RxJS[element] as any)(children));
    case "concat":
    case "merge":
    case "race":
    case "zip":
      return jsxObservableElement((RxJS[element] as any)(...children));
    case "from":
      return jsxObservableElement(RxJS.from(props.input));
    case "interval":
      return jsxObservableElement(RxJS.interval(props.period));
    case "of":
      return jsxObservableElement(RxJS.of(props.value));
    case "timer":
      return jsxObservableElement(RxJS.timer(props.dueTime, props.period));

    case "map":
      return jsxOperatorElement(operators.map(props.mapFn));
    case "filter":
      return jsxOperatorElement(operators.filter(props.filterFn));
    case "debounceTime":
      return jsxOperatorElement(operators.debounceTime(props.dueTime));
    case "delay":
      return jsxOperatorElement(operators.delay(props.delay));
    case "distinctUntilChanged":
      return jsxOperatorElement(
        operators.distinctUntilChanged(props.compareFn)
      );
    case "ignoreElements":
      return jsxOperatorElement(operators.ignoreElements());
    case "scan":
      return jsxOperatorElement(operators.scan(props.accumulator, props.seed));
    case "share":
      return jsxOperatorElement(operators.share());
    case "skip":
      return jsxOperatorElement(operators.skip(props.count));
    case "switchMap":
      return jsxOperatorElement(operators.switchMap(children[0]));
    case "take":
      return jsxOperatorElement(operators.take(props.count));
    case "tap":
      return jsxOperatorElement(
        operators.tap(props.next, props.error, props.complete)
      );
    case "withLatestFrom":
      return jsxOperatorElement(operators.withLatestFrom(children));
  }
};

function jsxObservableElement(v: RxJS.Observable<any>) {
  return Object.assign(v, {
    asObservable: () => v,
    asOperator: () => {
      throw new Error("value is not an operator");
    },
  });
}
function jsxOperatorElement(v: RxJS.OperatorFunction<any, any>) {
  return Object.assign(v, {
    asObservable: () => {
      throw new Error("value is not an observable");
    },
    asOperator: () => v,
  });
}

// type ExtractArguments<T> = T extends (...args: infer Args) => any
//   ? {
//     [K in keyof Args as 'foo']: Args[K]
//   }
//   : never;

// type Res = ExtractArguments<typeof map>;
