/** @jsx obs */
import { obs } from "./rxJsxRuntime";

const tick$ = <interval period={1000} />;

const result = (
  <pipe source$={tick$}>
    <scan accumulator={(v, i) => v + i} seed={0} />
    <map mapFn={(v) => (v % 2 === 0 ? "odd" : "even")} />
    <switchMap>
      {(value) =>
        value === "odd" ? (
          <from input={[1, 2, 3]} />
        ) : (
          <pipe source$={<timer dueTime={200} />}>
            <map mapFn={() => "delayed :)"} />
          </pipe>
        )
      }
    </switchMap>
    <take count={10} />
  </pipe>
);

result
  .asObservable()
  .subscribe(console.log, console.error, () => console.log("complete"));
