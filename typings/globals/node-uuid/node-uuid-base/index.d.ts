// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/node-uuid/node-uuid-base.d.ts
declare namespace __NodeUUID {
    interface UUIDOptions {

        /**
         * Node id as Array of 6 bytes (per 4.1.6).
         * Default: Randomly generated ID. See note 1.
         */
        node?: any[];

        /**
         * (Number between 0 - 0x3fff) RFC clock sequence.
         * Default: An internally maintained clockseq is used.
         */
        clockseq?: number;

        /**
         * (Number | Date) Time in milliseconds since unix Epoch.
         * Default: The current time is used.
         */
        msecs?: number|Date;

        /**
         * (Number between 0-9999) additional time, in 100-nanosecond units. Ignored if msecs is unspecified.
         * Default: internal uuid counter is used, as per 4.2.1.2.
         */
        nsecs?: number;
    }

    interface UUID {
        v1(options?: UUIDOptions): string;
        v1(options?: UUIDOptions, buffer?: number[], offset?: number): number[];

        v4(options?: UUIDOptions): string;
        v4(options?: UUIDOptions, buffer?: number[], offset?: number): number[];

        parse(id: string, buffer?: number[], offset?: number): number[];

        unparse(buffer: number[], offset?: number): string;
    }
}