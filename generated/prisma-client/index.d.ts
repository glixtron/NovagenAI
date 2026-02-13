
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Presentation
 * 
 */
export type Presentation = $Result.DefaultSelection<Prisma.$PresentationPayload>
/**
 * Model Slide
 * 
 */
export type Slide = $Result.DefaultSelection<Prisma.$SlidePayload>
/**
 * Model Element
 * 
 */
export type Element = $Result.DefaultSelection<Prisma.$ElementPayload>
/**
 * Model Template
 * 
 */
export type Template = $Result.DefaultSelection<Prisma.$TemplatePayload>
/**
 * Model Collaboration
 * 
 */
export type Collaboration = $Result.DefaultSelection<Prisma.$CollaborationPayload>
/**
 * Model Presence
 * 
 */
export type Presence = $Result.DefaultSelection<Prisma.$PresencePayload>
/**
 * Model StorageFile
 * 
 */
export type StorageFile = $Result.DefaultSelection<Prisma.$StorageFilePayload>
/**
 * Model AIGeneration
 * 
 */
export type AIGeneration = $Result.DefaultSelection<Prisma.$AIGenerationPayload>
/**
 * Model QueueJob
 * 
 */
export type QueueJob = $Result.DefaultSelection<Prisma.$QueueJobPayload>
/**
 * Model SearchIndex
 * 
 */
export type SearchIndex = $Result.DefaultSelection<Prisma.$SearchIndexPayload>
/**
 * Model Analytics
 * 
 */
export type Analytics = $Result.DefaultSelection<Prisma.$AnalyticsPayload>
/**
 * Model Export
 * 
 */
export type Export = $Result.DefaultSelection<Prisma.$ExportPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  PREMIUM: 'PREMIUM'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const AccountType: {
  OAUTH: 'OAUTH',
  EMAIL: 'EMAIL',
  API_KEY: 'API_KEY'
};

export type AccountType = (typeof AccountType)[keyof typeof AccountType]


export const PresentationStatus: {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
  PROCESSING: 'PROCESSING'
};

export type PresentationStatus = (typeof PresentationStatus)[keyof typeof PresentationStatus]


export const ElementType: {
  TEXT: 'TEXT',
  SHAPE: 'SHAPE',
  IMAGE: 'IMAGE',
  DRAWING: 'DRAWING',
  CHART: 'CHART',
  VIDEO: 'VIDEO'
};

export type ElementType = (typeof ElementType)[keyof typeof ElementType]


export const CollaborationRole: {
  OWNER: 'OWNER',
  EDITOR: 'EDITOR',
  VIEWER: 'VIEWER',
  COMMENTER: 'COMMENTER'
};

export type CollaborationRole = (typeof CollaborationRole)[keyof typeof CollaborationRole]


export const UserStatus: {
  ACTIVE: 'ACTIVE',
  IDLE: 'IDLE',
  AWAY: 'AWAY',
  BUSY: 'BUSY'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const GenerationStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type GenerationStatus = (typeof GenerationStatus)[keyof typeof GenerationStatus]


export const JobType: {
  PRESENTATION_PROCESSING: 'PRESENTATION_PROCESSING',
  IMAGE_GENERATION: 'IMAGE_GENERATION',
  CONTENT_GENERATION: 'CONTENT_GENERATION',
  EMAIL_SENDING: 'EMAIL_SENDING',
  SEARCH_INDEXING: 'SEARCH_INDEXING'
};

export type JobType = (typeof JobType)[keyof typeof JobType]


export const JobPriority: {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type JobPriority = (typeof JobPriority)[keyof typeof JobPriority]


export const JobStatus: {
  QUEUED: 'QUEUED',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]


export const ExportStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type ExportStatus = (typeof ExportStatus)[keyof typeof ExportStatus]


export const AnalyticsEvent: {
  PRESENTATION_CREATED: 'PRESENTATION_CREATED',
  PRESENTATION_UPDATED: 'PRESENTATION_UPDATED',
  PRESENTATION_DELETED: 'PRESENTATION_DELETED',
  PRESENTATION_SHARED: 'PRESENTATION_SHARED',
  TEMPLATE_USED: 'TEMPLATE_USED',
  AI_GENERATION_REQUESTED: 'AI_GENERATION_REQUESTED',
  AI_GENERATION_COMPLETED: 'AI_GENERATION_COMPLETED',
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  COLLABORATION_STARTED: 'COLLABORATION_STARTED',
  COLLABORATION_ENDED: 'COLLABORATION_ENDED',
  FILE_UPLOADED: 'FILE_UPLOADED',
  SEARCH_PERFORMED: 'SEARCH_PERFORMED',
  ERROR_OCCURRED: 'ERROR_OCCURRED'
};

export type AnalyticsEvent = (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type AccountType = $Enums.AccountType

export const AccountType: typeof $Enums.AccountType

export type PresentationStatus = $Enums.PresentationStatus

export const PresentationStatus: typeof $Enums.PresentationStatus

export type ElementType = $Enums.ElementType

export const ElementType: typeof $Enums.ElementType

export type CollaborationRole = $Enums.CollaborationRole

export const CollaborationRole: typeof $Enums.CollaborationRole

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type GenerationStatus = $Enums.GenerationStatus

export const GenerationStatus: typeof $Enums.GenerationStatus

export type JobType = $Enums.JobType

export const JobType: typeof $Enums.JobType

export type JobPriority = $Enums.JobPriority

export const JobPriority: typeof $Enums.JobPriority

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

export type ExportStatus = $Enums.ExportStatus

export const ExportStatus: typeof $Enums.ExportStatus

export type AnalyticsEvent = $Enums.AnalyticsEvent

export const AnalyticsEvent: typeof $Enums.AnalyticsEvent

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.presentation`: Exposes CRUD operations for the **Presentation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Presentations
    * const presentations = await prisma.presentation.findMany()
    * ```
    */
  get presentation(): Prisma.PresentationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.slide`: Exposes CRUD operations for the **Slide** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Slides
    * const slides = await prisma.slide.findMany()
    * ```
    */
  get slide(): Prisma.SlideDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.element`: Exposes CRUD operations for the **Element** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Elements
    * const elements = await prisma.element.findMany()
    * ```
    */
  get element(): Prisma.ElementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.template`: Exposes CRUD operations for the **Template** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Templates
    * const templates = await prisma.template.findMany()
    * ```
    */
  get template(): Prisma.TemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.collaboration`: Exposes CRUD operations for the **Collaboration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Collaborations
    * const collaborations = await prisma.collaboration.findMany()
    * ```
    */
  get collaboration(): Prisma.CollaborationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.presence`: Exposes CRUD operations for the **Presence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Presences
    * const presences = await prisma.presence.findMany()
    * ```
    */
  get presence(): Prisma.PresenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.storageFile`: Exposes CRUD operations for the **StorageFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StorageFiles
    * const storageFiles = await prisma.storageFile.findMany()
    * ```
    */
  get storageFile(): Prisma.StorageFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIGeneration`: Exposes CRUD operations for the **AIGeneration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIGenerations
    * const aIGenerations = await prisma.aIGeneration.findMany()
    * ```
    */
  get aIGeneration(): Prisma.AIGenerationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.queueJob`: Exposes CRUD operations for the **QueueJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QueueJobs
    * const queueJobs = await prisma.queueJob.findMany()
    * ```
    */
  get queueJob(): Prisma.QueueJobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.searchIndex`: Exposes CRUD operations for the **SearchIndex** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SearchIndices
    * const searchIndices = await prisma.searchIndex.findMany()
    * ```
    */
  get searchIndex(): Prisma.SearchIndexDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.analytics`: Exposes CRUD operations for the **Analytics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Analytics
    * const analytics = await prisma.analytics.findMany()
    * ```
    */
  get analytics(): Prisma.AnalyticsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.export`: Exposes CRUD operations for the **Export** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exports
    * const exports = await prisma.export.findMany()
    * ```
    */
  get export(): Prisma.ExportDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Presentation: 'Presentation',
    Slide: 'Slide',
    Element: 'Element',
    Template: 'Template',
    Collaboration: 'Collaboration',
    Presence: 'Presence',
    StorageFile: 'StorageFile',
    AIGeneration: 'AIGeneration',
    QueueJob: 'QueueJob',
    SearchIndex: 'SearchIndex',
    Analytics: 'Analytics',
    Export: 'Export'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "presentation" | "slide" | "element" | "template" | "collaboration" | "presence" | "storageFile" | "aIGeneration" | "queueJob" | "searchIndex" | "analytics" | "export"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Presentation: {
        payload: Prisma.$PresentationPayload<ExtArgs>
        fields: Prisma.PresentationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PresentationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresentationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PresentationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresentationPayload>
          }
          findFirst: {
            args: Prisma.PresentationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresentationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PresentationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresentationPayload>
          }
          findMany: {
            args: Prisma.PresentationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresentationPayload>[]
          }
          create: {
            args: Prisma.PresentationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresentationPayload>
          }
          createMany: {
            args: Prisma.PresentationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PresentationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresentationPayload>[]
          }
          delete: {
            args: Prisma.PresentationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresentationPayload>
          }
          update: {
            args: Prisma.PresentationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresentationPayload>
          }
          deleteMany: {
            args: Prisma.PresentationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PresentationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PresentationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresentationPayload>[]
          }
          upsert: {
            args: Prisma.PresentationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresentationPayload>
          }
          aggregate: {
            args: Prisma.PresentationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePresentation>
          }
          groupBy: {
            args: Prisma.PresentationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PresentationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PresentationCountArgs<ExtArgs>
            result: $Utils.Optional<PresentationCountAggregateOutputType> | number
          }
        }
      }
      Slide: {
        payload: Prisma.$SlidePayload<ExtArgs>
        fields: Prisma.SlideFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SlideFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlidePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SlideFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlidePayload>
          }
          findFirst: {
            args: Prisma.SlideFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlidePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SlideFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlidePayload>
          }
          findMany: {
            args: Prisma.SlideFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlidePayload>[]
          }
          create: {
            args: Prisma.SlideCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlidePayload>
          }
          createMany: {
            args: Prisma.SlideCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SlideCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlidePayload>[]
          }
          delete: {
            args: Prisma.SlideDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlidePayload>
          }
          update: {
            args: Prisma.SlideUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlidePayload>
          }
          deleteMany: {
            args: Prisma.SlideDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SlideUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SlideUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlidePayload>[]
          }
          upsert: {
            args: Prisma.SlideUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlidePayload>
          }
          aggregate: {
            args: Prisma.SlideAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSlide>
          }
          groupBy: {
            args: Prisma.SlideGroupByArgs<ExtArgs>
            result: $Utils.Optional<SlideGroupByOutputType>[]
          }
          count: {
            args: Prisma.SlideCountArgs<ExtArgs>
            result: $Utils.Optional<SlideCountAggregateOutputType> | number
          }
        }
      }
      Element: {
        payload: Prisma.$ElementPayload<ExtArgs>
        fields: Prisma.ElementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          findFirst: {
            args: Prisma.ElementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          findMany: {
            args: Prisma.ElementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          create: {
            args: Prisma.ElementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          createMany: {
            args: Prisma.ElementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ElementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          delete: {
            args: Prisma.ElementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          update: {
            args: Prisma.ElementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          deleteMany: {
            args: Prisma.ElementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ElementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          upsert: {
            args: Prisma.ElementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          aggregate: {
            args: Prisma.ElementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElement>
          }
          groupBy: {
            args: Prisma.ElementGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElementGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElementCountArgs<ExtArgs>
            result: $Utils.Optional<ElementCountAggregateOutputType> | number
          }
        }
      }
      Template: {
        payload: Prisma.$TemplatePayload<ExtArgs>
        fields: Prisma.TemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findFirst: {
            args: Prisma.TemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findMany: {
            args: Prisma.TemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          create: {
            args: Prisma.TemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          createMany: {
            args: Prisma.TemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          delete: {
            args: Prisma.TemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          update: {
            args: Prisma.TemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          deleteMany: {
            args: Prisma.TemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          upsert: {
            args: Prisma.TemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          aggregate: {
            args: Prisma.TemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplate>
          }
          groupBy: {
            args: Prisma.TemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateCountAggregateOutputType> | number
          }
        }
      }
      Collaboration: {
        payload: Prisma.$CollaborationPayload<ExtArgs>
        fields: Prisma.CollaborationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CollaborationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CollaborationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborationPayload>
          }
          findFirst: {
            args: Prisma.CollaborationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CollaborationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborationPayload>
          }
          findMany: {
            args: Prisma.CollaborationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborationPayload>[]
          }
          create: {
            args: Prisma.CollaborationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborationPayload>
          }
          createMany: {
            args: Prisma.CollaborationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CollaborationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborationPayload>[]
          }
          delete: {
            args: Prisma.CollaborationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborationPayload>
          }
          update: {
            args: Prisma.CollaborationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborationPayload>
          }
          deleteMany: {
            args: Prisma.CollaborationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CollaborationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CollaborationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborationPayload>[]
          }
          upsert: {
            args: Prisma.CollaborationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborationPayload>
          }
          aggregate: {
            args: Prisma.CollaborationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCollaboration>
          }
          groupBy: {
            args: Prisma.CollaborationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CollaborationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CollaborationCountArgs<ExtArgs>
            result: $Utils.Optional<CollaborationCountAggregateOutputType> | number
          }
        }
      }
      Presence: {
        payload: Prisma.$PresencePayload<ExtArgs>
        fields: Prisma.PresenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PresenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PresenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresencePayload>
          }
          findFirst: {
            args: Prisma.PresenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PresenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresencePayload>
          }
          findMany: {
            args: Prisma.PresenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresencePayload>[]
          }
          create: {
            args: Prisma.PresenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresencePayload>
          }
          createMany: {
            args: Prisma.PresenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PresenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresencePayload>[]
          }
          delete: {
            args: Prisma.PresenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresencePayload>
          }
          update: {
            args: Prisma.PresenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresencePayload>
          }
          deleteMany: {
            args: Prisma.PresenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PresenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PresenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresencePayload>[]
          }
          upsert: {
            args: Prisma.PresenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresencePayload>
          }
          aggregate: {
            args: Prisma.PresenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePresence>
          }
          groupBy: {
            args: Prisma.PresenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<PresenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.PresenceCountArgs<ExtArgs>
            result: $Utils.Optional<PresenceCountAggregateOutputType> | number
          }
        }
      }
      StorageFile: {
        payload: Prisma.$StorageFilePayload<ExtArgs>
        fields: Prisma.StorageFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StorageFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StorageFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageFilePayload>
          }
          findFirst: {
            args: Prisma.StorageFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StorageFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageFilePayload>
          }
          findMany: {
            args: Prisma.StorageFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageFilePayload>[]
          }
          create: {
            args: Prisma.StorageFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageFilePayload>
          }
          createMany: {
            args: Prisma.StorageFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StorageFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageFilePayload>[]
          }
          delete: {
            args: Prisma.StorageFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageFilePayload>
          }
          update: {
            args: Prisma.StorageFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageFilePayload>
          }
          deleteMany: {
            args: Prisma.StorageFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StorageFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StorageFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageFilePayload>[]
          }
          upsert: {
            args: Prisma.StorageFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageFilePayload>
          }
          aggregate: {
            args: Prisma.StorageFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStorageFile>
          }
          groupBy: {
            args: Prisma.StorageFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<StorageFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.StorageFileCountArgs<ExtArgs>
            result: $Utils.Optional<StorageFileCountAggregateOutputType> | number
          }
        }
      }
      AIGeneration: {
        payload: Prisma.$AIGenerationPayload<ExtArgs>
        fields: Prisma.AIGenerationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIGenerationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIGenerationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          findFirst: {
            args: Prisma.AIGenerationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIGenerationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          findMany: {
            args: Prisma.AIGenerationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>[]
          }
          create: {
            args: Prisma.AIGenerationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          createMany: {
            args: Prisma.AIGenerationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIGenerationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>[]
          }
          delete: {
            args: Prisma.AIGenerationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          update: {
            args: Prisma.AIGenerationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          deleteMany: {
            args: Prisma.AIGenerationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIGenerationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIGenerationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>[]
          }
          upsert: {
            args: Prisma.AIGenerationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          aggregate: {
            args: Prisma.AIGenerationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIGeneration>
          }
          groupBy: {
            args: Prisma.AIGenerationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIGenerationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIGenerationCountArgs<ExtArgs>
            result: $Utils.Optional<AIGenerationCountAggregateOutputType> | number
          }
        }
      }
      QueueJob: {
        payload: Prisma.$QueueJobPayload<ExtArgs>
        fields: Prisma.QueueJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QueueJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QueueJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueJobPayload>
          }
          findFirst: {
            args: Prisma.QueueJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QueueJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueJobPayload>
          }
          findMany: {
            args: Prisma.QueueJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueJobPayload>[]
          }
          create: {
            args: Prisma.QueueJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueJobPayload>
          }
          createMany: {
            args: Prisma.QueueJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QueueJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueJobPayload>[]
          }
          delete: {
            args: Prisma.QueueJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueJobPayload>
          }
          update: {
            args: Prisma.QueueJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueJobPayload>
          }
          deleteMany: {
            args: Prisma.QueueJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QueueJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QueueJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueJobPayload>[]
          }
          upsert: {
            args: Prisma.QueueJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueJobPayload>
          }
          aggregate: {
            args: Prisma.QueueJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQueueJob>
          }
          groupBy: {
            args: Prisma.QueueJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<QueueJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.QueueJobCountArgs<ExtArgs>
            result: $Utils.Optional<QueueJobCountAggregateOutputType> | number
          }
        }
      }
      SearchIndex: {
        payload: Prisma.$SearchIndexPayload<ExtArgs>
        fields: Prisma.SearchIndexFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SearchIndexFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SearchIndexFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexPayload>
          }
          findFirst: {
            args: Prisma.SearchIndexFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SearchIndexFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexPayload>
          }
          findMany: {
            args: Prisma.SearchIndexFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexPayload>[]
          }
          create: {
            args: Prisma.SearchIndexCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexPayload>
          }
          createMany: {
            args: Prisma.SearchIndexCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SearchIndexCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexPayload>[]
          }
          delete: {
            args: Prisma.SearchIndexDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexPayload>
          }
          update: {
            args: Prisma.SearchIndexUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexPayload>
          }
          deleteMany: {
            args: Prisma.SearchIndexDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SearchIndexUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SearchIndexUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexPayload>[]
          }
          upsert: {
            args: Prisma.SearchIndexUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexPayload>
          }
          aggregate: {
            args: Prisma.SearchIndexAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSearchIndex>
          }
          groupBy: {
            args: Prisma.SearchIndexGroupByArgs<ExtArgs>
            result: $Utils.Optional<SearchIndexGroupByOutputType>[]
          }
          count: {
            args: Prisma.SearchIndexCountArgs<ExtArgs>
            result: $Utils.Optional<SearchIndexCountAggregateOutputType> | number
          }
        }
      }
      Analytics: {
        payload: Prisma.$AnalyticsPayload<ExtArgs>
        fields: Prisma.AnalyticsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalyticsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalyticsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          findFirst: {
            args: Prisma.AnalyticsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalyticsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          findMany: {
            args: Prisma.AnalyticsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>[]
          }
          create: {
            args: Prisma.AnalyticsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          createMany: {
            args: Prisma.AnalyticsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalyticsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>[]
          }
          delete: {
            args: Prisma.AnalyticsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          update: {
            args: Prisma.AnalyticsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          deleteMany: {
            args: Prisma.AnalyticsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalyticsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalyticsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>[]
          }
          upsert: {
            args: Prisma.AnalyticsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsPayload>
          }
          aggregate: {
            args: Prisma.AnalyticsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalytics>
          }
          groupBy: {
            args: Prisma.AnalyticsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalyticsCountArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsCountAggregateOutputType> | number
          }
        }
      }
      Export: {
        payload: Prisma.$ExportPayload<ExtArgs>
        fields: Prisma.ExportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportPayload>
          }
          findFirst: {
            args: Prisma.ExportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportPayload>
          }
          findMany: {
            args: Prisma.ExportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportPayload>[]
          }
          create: {
            args: Prisma.ExportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportPayload>
          }
          createMany: {
            args: Prisma.ExportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportPayload>[]
          }
          delete: {
            args: Prisma.ExportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportPayload>
          }
          update: {
            args: Prisma.ExportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportPayload>
          }
          deleteMany: {
            args: Prisma.ExportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportPayload>[]
          }
          upsert: {
            args: Prisma.ExportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportPayload>
          }
          aggregate: {
            args: Prisma.ExportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExport>
          }
          groupBy: {
            args: Prisma.ExportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExportCountArgs<ExtArgs>
            result: $Utils.Optional<ExportCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    presentation?: PresentationOmit
    slide?: SlideOmit
    element?: ElementOmit
    template?: TemplateOmit
    collaboration?: CollaborationOmit
    presence?: PresenceOmit
    storageFile?: StorageFileOmit
    aIGeneration?: AIGenerationOmit
    queueJob?: QueueJobOmit
    searchIndex?: SearchIndexOmit
    analytics?: AnalyticsOmit
    export?: ExportOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PresentationCountOutputType
   */

  export type PresentationCountOutputType = {
    slides: number
    exports: number
  }

  export type PresentationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slides?: boolean | PresentationCountOutputTypeCountSlidesArgs
    exports?: boolean | PresentationCountOutputTypeCountExportsArgs
  }

  // Custom InputTypes
  /**
   * PresentationCountOutputType without action
   */
  export type PresentationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PresentationCountOutputType
     */
    select?: PresentationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PresentationCountOutputType without action
   */
  export type PresentationCountOutputTypeCountSlidesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SlideWhereInput
  }

  /**
   * PresentationCountOutputType without action
   */
  export type PresentationCountOutputTypeCountExportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExportWhereInput
  }


  /**
   * Count Type SlideCountOutputType
   */

  export type SlideCountOutputType = {
    elements: number
  }

  export type SlideCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elements?: boolean | SlideCountOutputTypeCountElementsArgs
  }

  // Custom InputTypes
  /**
   * SlideCountOutputType without action
   */
  export type SlideCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlideCountOutputType
     */
    select?: SlideCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SlideCountOutputType without action
   */
  export type SlideCountOutputTypeCountElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatar: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatar: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    avatar: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatar?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatar?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatar?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    avatar: string | null
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatar?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatar?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatar?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    avatar?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "avatar" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      avatar: string | null
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.AccountType | null
    provider: string | null
    providerAccountId: string | null
    accessToken: string | null
    refreshToken: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.AccountType | null
    provider: string | null
    providerAccountId: string | null
    accessToken: string | null
    refreshToken: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    accessToken: number
    refreshToken: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.AccountType
    provider: string
    providerAccountId: string | null
    accessToken: string
    refreshToken: string | null
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "accessToken" | "refreshToken" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.AccountType
      provider: string
      providerAccountId: string | null
      accessToken: string
      refreshToken: string | null
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'AccountType'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly expiresAt: FieldRef<"Account", 'DateTime'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
  }


  /**
   * Model Presentation
   */

  export type AggregatePresentation = {
    _count: PresentationCountAggregateOutputType | null
    _min: PresentationMinAggregateOutputType | null
    _max: PresentationMaxAggregateOutputType | null
  }

  export type PresentationMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    userId: string | null
    templateId: string | null
    status: $Enums.PresentationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PresentationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    userId: string | null
    templateId: string | null
    status: $Enums.PresentationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PresentationCountAggregateOutputType = {
    id: number
    title: number
    description: number
    userId: number
    templateId: number
    status: number
    data: number
    settings: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PresentationMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    userId?: true
    templateId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PresentationMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    userId?: true
    templateId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PresentationCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    userId?: true
    templateId?: true
    status?: true
    data?: true
    settings?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PresentationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Presentation to aggregate.
     */
    where?: PresentationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presentations to fetch.
     */
    orderBy?: PresentationOrderByWithRelationInput | PresentationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PresentationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presentations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presentations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Presentations
    **/
    _count?: true | PresentationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PresentationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PresentationMaxAggregateInputType
  }

  export type GetPresentationAggregateType<T extends PresentationAggregateArgs> = {
        [P in keyof T & keyof AggregatePresentation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePresentation[P]>
      : GetScalarType<T[P], AggregatePresentation[P]>
  }




  export type PresentationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PresentationWhereInput
    orderBy?: PresentationOrderByWithAggregationInput | PresentationOrderByWithAggregationInput[]
    by: PresentationScalarFieldEnum[] | PresentationScalarFieldEnum
    having?: PresentationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PresentationCountAggregateInputType | true
    _min?: PresentationMinAggregateInputType
    _max?: PresentationMaxAggregateInputType
  }

  export type PresentationGroupByOutputType = {
    id: string
    title: string
    description: string | null
    userId: string
    templateId: string | null
    status: $Enums.PresentationStatus
    data: JsonValue | null
    settings: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: PresentationCountAggregateOutputType | null
    _min: PresentationMinAggregateOutputType | null
    _max: PresentationMaxAggregateOutputType | null
  }

  type GetPresentationGroupByPayload<T extends PresentationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PresentationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PresentationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PresentationGroupByOutputType[P]>
            : GetScalarType<T[P], PresentationGroupByOutputType[P]>
        }
      >
    >


  export type PresentationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    userId?: boolean
    templateId?: boolean
    status?: boolean
    data?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slides?: boolean | Presentation$slidesArgs<ExtArgs>
    exports?: boolean | Presentation$exportsArgs<ExtArgs>
    _count?: boolean | PresentationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["presentation"]>

  export type PresentationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    userId?: boolean
    templateId?: boolean
    status?: boolean
    data?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["presentation"]>

  export type PresentationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    userId?: boolean
    templateId?: boolean
    status?: boolean
    data?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["presentation"]>

  export type PresentationSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    userId?: boolean
    templateId?: boolean
    status?: boolean
    data?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PresentationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "userId" | "templateId" | "status" | "data" | "settings" | "createdAt" | "updatedAt", ExtArgs["result"]["presentation"]>
  export type PresentationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slides?: boolean | Presentation$slidesArgs<ExtArgs>
    exports?: boolean | Presentation$exportsArgs<ExtArgs>
    _count?: boolean | PresentationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PresentationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PresentationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PresentationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Presentation"
    objects: {
      slides: Prisma.$SlidePayload<ExtArgs>[]
      exports: Prisma.$ExportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      userId: string
      templateId: string | null
      status: $Enums.PresentationStatus
      data: Prisma.JsonValue | null
      settings: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["presentation"]>
    composites: {}
  }

  type PresentationGetPayload<S extends boolean | null | undefined | PresentationDefaultArgs> = $Result.GetResult<Prisma.$PresentationPayload, S>

  type PresentationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PresentationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PresentationCountAggregateInputType | true
    }

  export interface PresentationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Presentation'], meta: { name: 'Presentation' } }
    /**
     * Find zero or one Presentation that matches the filter.
     * @param {PresentationFindUniqueArgs} args - Arguments to find a Presentation
     * @example
     * // Get one Presentation
     * const presentation = await prisma.presentation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PresentationFindUniqueArgs>(args: SelectSubset<T, PresentationFindUniqueArgs<ExtArgs>>): Prisma__PresentationClient<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Presentation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PresentationFindUniqueOrThrowArgs} args - Arguments to find a Presentation
     * @example
     * // Get one Presentation
     * const presentation = await prisma.presentation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PresentationFindUniqueOrThrowArgs>(args: SelectSubset<T, PresentationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PresentationClient<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Presentation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresentationFindFirstArgs} args - Arguments to find a Presentation
     * @example
     * // Get one Presentation
     * const presentation = await prisma.presentation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PresentationFindFirstArgs>(args?: SelectSubset<T, PresentationFindFirstArgs<ExtArgs>>): Prisma__PresentationClient<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Presentation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresentationFindFirstOrThrowArgs} args - Arguments to find a Presentation
     * @example
     * // Get one Presentation
     * const presentation = await prisma.presentation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PresentationFindFirstOrThrowArgs>(args?: SelectSubset<T, PresentationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PresentationClient<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Presentations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresentationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Presentations
     * const presentations = await prisma.presentation.findMany()
     * 
     * // Get first 10 Presentations
     * const presentations = await prisma.presentation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const presentationWithIdOnly = await prisma.presentation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PresentationFindManyArgs>(args?: SelectSubset<T, PresentationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Presentation.
     * @param {PresentationCreateArgs} args - Arguments to create a Presentation.
     * @example
     * // Create one Presentation
     * const Presentation = await prisma.presentation.create({
     *   data: {
     *     // ... data to create a Presentation
     *   }
     * })
     * 
     */
    create<T extends PresentationCreateArgs>(args: SelectSubset<T, PresentationCreateArgs<ExtArgs>>): Prisma__PresentationClient<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Presentations.
     * @param {PresentationCreateManyArgs} args - Arguments to create many Presentations.
     * @example
     * // Create many Presentations
     * const presentation = await prisma.presentation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PresentationCreateManyArgs>(args?: SelectSubset<T, PresentationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Presentations and returns the data saved in the database.
     * @param {PresentationCreateManyAndReturnArgs} args - Arguments to create many Presentations.
     * @example
     * // Create many Presentations
     * const presentation = await prisma.presentation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Presentations and only return the `id`
     * const presentationWithIdOnly = await prisma.presentation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PresentationCreateManyAndReturnArgs>(args?: SelectSubset<T, PresentationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Presentation.
     * @param {PresentationDeleteArgs} args - Arguments to delete one Presentation.
     * @example
     * // Delete one Presentation
     * const Presentation = await prisma.presentation.delete({
     *   where: {
     *     // ... filter to delete one Presentation
     *   }
     * })
     * 
     */
    delete<T extends PresentationDeleteArgs>(args: SelectSubset<T, PresentationDeleteArgs<ExtArgs>>): Prisma__PresentationClient<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Presentation.
     * @param {PresentationUpdateArgs} args - Arguments to update one Presentation.
     * @example
     * // Update one Presentation
     * const presentation = await prisma.presentation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PresentationUpdateArgs>(args: SelectSubset<T, PresentationUpdateArgs<ExtArgs>>): Prisma__PresentationClient<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Presentations.
     * @param {PresentationDeleteManyArgs} args - Arguments to filter Presentations to delete.
     * @example
     * // Delete a few Presentations
     * const { count } = await prisma.presentation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PresentationDeleteManyArgs>(args?: SelectSubset<T, PresentationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Presentations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresentationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Presentations
     * const presentation = await prisma.presentation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PresentationUpdateManyArgs>(args: SelectSubset<T, PresentationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Presentations and returns the data updated in the database.
     * @param {PresentationUpdateManyAndReturnArgs} args - Arguments to update many Presentations.
     * @example
     * // Update many Presentations
     * const presentation = await prisma.presentation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Presentations and only return the `id`
     * const presentationWithIdOnly = await prisma.presentation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PresentationUpdateManyAndReturnArgs>(args: SelectSubset<T, PresentationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Presentation.
     * @param {PresentationUpsertArgs} args - Arguments to update or create a Presentation.
     * @example
     * // Update or create a Presentation
     * const presentation = await prisma.presentation.upsert({
     *   create: {
     *     // ... data to create a Presentation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Presentation we want to update
     *   }
     * })
     */
    upsert<T extends PresentationUpsertArgs>(args: SelectSubset<T, PresentationUpsertArgs<ExtArgs>>): Prisma__PresentationClient<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Presentations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresentationCountArgs} args - Arguments to filter Presentations to count.
     * @example
     * // Count the number of Presentations
     * const count = await prisma.presentation.count({
     *   where: {
     *     // ... the filter for the Presentations we want to count
     *   }
     * })
    **/
    count<T extends PresentationCountArgs>(
      args?: Subset<T, PresentationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PresentationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Presentation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresentationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PresentationAggregateArgs>(args: Subset<T, PresentationAggregateArgs>): Prisma.PrismaPromise<GetPresentationAggregateType<T>>

    /**
     * Group by Presentation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresentationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PresentationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PresentationGroupByArgs['orderBy'] }
        : { orderBy?: PresentationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PresentationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPresentationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Presentation model
   */
  readonly fields: PresentationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Presentation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PresentationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    slides<T extends Presentation$slidesArgs<ExtArgs> = {}>(args?: Subset<T, Presentation$slidesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exports<T extends Presentation$exportsArgs<ExtArgs> = {}>(args?: Subset<T, Presentation$exportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Presentation model
   */
  interface PresentationFieldRefs {
    readonly id: FieldRef<"Presentation", 'String'>
    readonly title: FieldRef<"Presentation", 'String'>
    readonly description: FieldRef<"Presentation", 'String'>
    readonly userId: FieldRef<"Presentation", 'String'>
    readonly templateId: FieldRef<"Presentation", 'String'>
    readonly status: FieldRef<"Presentation", 'PresentationStatus'>
    readonly data: FieldRef<"Presentation", 'Json'>
    readonly settings: FieldRef<"Presentation", 'Json'>
    readonly createdAt: FieldRef<"Presentation", 'DateTime'>
    readonly updatedAt: FieldRef<"Presentation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Presentation findUnique
   */
  export type PresentationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresentationInclude<ExtArgs> | null
    /**
     * Filter, which Presentation to fetch.
     */
    where: PresentationWhereUniqueInput
  }

  /**
   * Presentation findUniqueOrThrow
   */
  export type PresentationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresentationInclude<ExtArgs> | null
    /**
     * Filter, which Presentation to fetch.
     */
    where: PresentationWhereUniqueInput
  }

  /**
   * Presentation findFirst
   */
  export type PresentationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresentationInclude<ExtArgs> | null
    /**
     * Filter, which Presentation to fetch.
     */
    where?: PresentationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presentations to fetch.
     */
    orderBy?: PresentationOrderByWithRelationInput | PresentationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Presentations.
     */
    cursor?: PresentationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presentations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presentations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Presentations.
     */
    distinct?: PresentationScalarFieldEnum | PresentationScalarFieldEnum[]
  }

  /**
   * Presentation findFirstOrThrow
   */
  export type PresentationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresentationInclude<ExtArgs> | null
    /**
     * Filter, which Presentation to fetch.
     */
    where?: PresentationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presentations to fetch.
     */
    orderBy?: PresentationOrderByWithRelationInput | PresentationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Presentations.
     */
    cursor?: PresentationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presentations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presentations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Presentations.
     */
    distinct?: PresentationScalarFieldEnum | PresentationScalarFieldEnum[]
  }

  /**
   * Presentation findMany
   */
  export type PresentationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresentationInclude<ExtArgs> | null
    /**
     * Filter, which Presentations to fetch.
     */
    where?: PresentationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presentations to fetch.
     */
    orderBy?: PresentationOrderByWithRelationInput | PresentationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Presentations.
     */
    cursor?: PresentationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presentations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presentations.
     */
    skip?: number
    distinct?: PresentationScalarFieldEnum | PresentationScalarFieldEnum[]
  }

  /**
   * Presentation create
   */
  export type PresentationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresentationInclude<ExtArgs> | null
    /**
     * The data needed to create a Presentation.
     */
    data: XOR<PresentationCreateInput, PresentationUncheckedCreateInput>
  }

  /**
   * Presentation createMany
   */
  export type PresentationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Presentations.
     */
    data: PresentationCreateManyInput | PresentationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Presentation createManyAndReturn
   */
  export type PresentationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * The data used to create many Presentations.
     */
    data: PresentationCreateManyInput | PresentationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Presentation update
   */
  export type PresentationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresentationInclude<ExtArgs> | null
    /**
     * The data needed to update a Presentation.
     */
    data: XOR<PresentationUpdateInput, PresentationUncheckedUpdateInput>
    /**
     * Choose, which Presentation to update.
     */
    where: PresentationWhereUniqueInput
  }

  /**
   * Presentation updateMany
   */
  export type PresentationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Presentations.
     */
    data: XOR<PresentationUpdateManyMutationInput, PresentationUncheckedUpdateManyInput>
    /**
     * Filter which Presentations to update
     */
    where?: PresentationWhereInput
    /**
     * Limit how many Presentations to update.
     */
    limit?: number
  }

  /**
   * Presentation updateManyAndReturn
   */
  export type PresentationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * The data used to update Presentations.
     */
    data: XOR<PresentationUpdateManyMutationInput, PresentationUncheckedUpdateManyInput>
    /**
     * Filter which Presentations to update
     */
    where?: PresentationWhereInput
    /**
     * Limit how many Presentations to update.
     */
    limit?: number
  }

  /**
   * Presentation upsert
   */
  export type PresentationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresentationInclude<ExtArgs> | null
    /**
     * The filter to search for the Presentation to update in case it exists.
     */
    where: PresentationWhereUniqueInput
    /**
     * In case the Presentation found by the `where` argument doesn't exist, create a new Presentation with this data.
     */
    create: XOR<PresentationCreateInput, PresentationUncheckedCreateInput>
    /**
     * In case the Presentation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PresentationUpdateInput, PresentationUncheckedUpdateInput>
  }

  /**
   * Presentation delete
   */
  export type PresentationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresentationInclude<ExtArgs> | null
    /**
     * Filter which Presentation to delete.
     */
    where: PresentationWhereUniqueInput
  }

  /**
   * Presentation deleteMany
   */
  export type PresentationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Presentations to delete
     */
    where?: PresentationWhereInput
    /**
     * Limit how many Presentations to delete.
     */
    limit?: number
  }

  /**
   * Presentation.slides
   */
  export type Presentation$slidesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideInclude<ExtArgs> | null
    where?: SlideWhereInput
    orderBy?: SlideOrderByWithRelationInput | SlideOrderByWithRelationInput[]
    cursor?: SlideWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SlideScalarFieldEnum | SlideScalarFieldEnum[]
  }

  /**
   * Presentation.exports
   */
  export type Presentation$exportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportInclude<ExtArgs> | null
    where?: ExportWhereInput
    orderBy?: ExportOrderByWithRelationInput | ExportOrderByWithRelationInput[]
    cursor?: ExportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExportScalarFieldEnum | ExportScalarFieldEnum[]
  }

  /**
   * Presentation without action
   */
  export type PresentationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presentation
     */
    select?: PresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presentation
     */
    omit?: PresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresentationInclude<ExtArgs> | null
  }


  /**
   * Model Slide
   */

  export type AggregateSlide = {
    _count: SlideCountAggregateOutputType | null
    _avg: SlideAvgAggregateOutputType | null
    _sum: SlideSumAggregateOutputType | null
    _min: SlideMinAggregateOutputType | null
    _max: SlideMaxAggregateOutputType | null
  }

  export type SlideAvgAggregateOutputType = {
    order: number | null
  }

  export type SlideSumAggregateOutputType = {
    order: number | null
  }

  export type SlideMinAggregateOutputType = {
    id: string | null
    presentationId: string | null
    order: number | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SlideMaxAggregateOutputType = {
    id: string | null
    presentationId: string | null
    order: number | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SlideCountAggregateOutputType = {
    id: number
    presentationId: number
    order: number
    title: number
    content: number
    background: number
    transitions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SlideAvgAggregateInputType = {
    order?: true
  }

  export type SlideSumAggregateInputType = {
    order?: true
  }

  export type SlideMinAggregateInputType = {
    id?: true
    presentationId?: true
    order?: true
    title?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SlideMaxAggregateInputType = {
    id?: true
    presentationId?: true
    order?: true
    title?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SlideCountAggregateInputType = {
    id?: true
    presentationId?: true
    order?: true
    title?: true
    content?: true
    background?: true
    transitions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SlideAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Slide to aggregate.
     */
    where?: SlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slides to fetch.
     */
    orderBy?: SlideOrderByWithRelationInput | SlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Slides
    **/
    _count?: true | SlideCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SlideAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SlideSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SlideMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SlideMaxAggregateInputType
  }

  export type GetSlideAggregateType<T extends SlideAggregateArgs> = {
        [P in keyof T & keyof AggregateSlide]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSlide[P]>
      : GetScalarType<T[P], AggregateSlide[P]>
  }




  export type SlideGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SlideWhereInput
    orderBy?: SlideOrderByWithAggregationInput | SlideOrderByWithAggregationInput[]
    by: SlideScalarFieldEnum[] | SlideScalarFieldEnum
    having?: SlideScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SlideCountAggregateInputType | true
    _avg?: SlideAvgAggregateInputType
    _sum?: SlideSumAggregateInputType
    _min?: SlideMinAggregateInputType
    _max?: SlideMaxAggregateInputType
  }

  export type SlideGroupByOutputType = {
    id: string
    presentationId: string
    order: number
    title: string
    content: JsonValue | null
    background: JsonValue | null
    transitions: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: SlideCountAggregateOutputType | null
    _avg: SlideAvgAggregateOutputType | null
    _sum: SlideSumAggregateOutputType | null
    _min: SlideMinAggregateOutputType | null
    _max: SlideMaxAggregateOutputType | null
  }

  type GetSlideGroupByPayload<T extends SlideGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SlideGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SlideGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SlideGroupByOutputType[P]>
            : GetScalarType<T[P], SlideGroupByOutputType[P]>
        }
      >
    >


  export type SlideSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presentationId?: boolean
    order?: boolean
    title?: boolean
    content?: boolean
    background?: boolean
    transitions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
    elements?: boolean | Slide$elementsArgs<ExtArgs>
    _count?: boolean | SlideCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["slide"]>

  export type SlideSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presentationId?: boolean
    order?: boolean
    title?: boolean
    content?: boolean
    background?: boolean
    transitions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["slide"]>

  export type SlideSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presentationId?: boolean
    order?: boolean
    title?: boolean
    content?: boolean
    background?: boolean
    transitions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["slide"]>

  export type SlideSelectScalar = {
    id?: boolean
    presentationId?: boolean
    order?: boolean
    title?: boolean
    content?: boolean
    background?: boolean
    transitions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SlideOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "presentationId" | "order" | "title" | "content" | "background" | "transitions" | "createdAt" | "updatedAt", ExtArgs["result"]["slide"]>
  export type SlideInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
    elements?: boolean | Slide$elementsArgs<ExtArgs>
    _count?: boolean | SlideCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SlideIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
  }
  export type SlideIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
  }

  export type $SlidePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Slide"
    objects: {
      presentation: Prisma.$PresentationPayload<ExtArgs>
      elements: Prisma.$ElementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      presentationId: string
      order: number
      title: string
      content: Prisma.JsonValue | null
      background: Prisma.JsonValue | null
      transitions: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["slide"]>
    composites: {}
  }

  type SlideGetPayload<S extends boolean | null | undefined | SlideDefaultArgs> = $Result.GetResult<Prisma.$SlidePayload, S>

  type SlideCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SlideFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SlideCountAggregateInputType | true
    }

  export interface SlideDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Slide'], meta: { name: 'Slide' } }
    /**
     * Find zero or one Slide that matches the filter.
     * @param {SlideFindUniqueArgs} args - Arguments to find a Slide
     * @example
     * // Get one Slide
     * const slide = await prisma.slide.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SlideFindUniqueArgs>(args: SelectSubset<T, SlideFindUniqueArgs<ExtArgs>>): Prisma__SlideClient<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Slide that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SlideFindUniqueOrThrowArgs} args - Arguments to find a Slide
     * @example
     * // Get one Slide
     * const slide = await prisma.slide.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SlideFindUniqueOrThrowArgs>(args: SelectSubset<T, SlideFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SlideClient<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slide that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlideFindFirstArgs} args - Arguments to find a Slide
     * @example
     * // Get one Slide
     * const slide = await prisma.slide.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SlideFindFirstArgs>(args?: SelectSubset<T, SlideFindFirstArgs<ExtArgs>>): Prisma__SlideClient<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slide that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlideFindFirstOrThrowArgs} args - Arguments to find a Slide
     * @example
     * // Get one Slide
     * const slide = await prisma.slide.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SlideFindFirstOrThrowArgs>(args?: SelectSubset<T, SlideFindFirstOrThrowArgs<ExtArgs>>): Prisma__SlideClient<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Slides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlideFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Slides
     * const slides = await prisma.slide.findMany()
     * 
     * // Get first 10 Slides
     * const slides = await prisma.slide.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const slideWithIdOnly = await prisma.slide.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SlideFindManyArgs>(args?: SelectSubset<T, SlideFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Slide.
     * @param {SlideCreateArgs} args - Arguments to create a Slide.
     * @example
     * // Create one Slide
     * const Slide = await prisma.slide.create({
     *   data: {
     *     // ... data to create a Slide
     *   }
     * })
     * 
     */
    create<T extends SlideCreateArgs>(args: SelectSubset<T, SlideCreateArgs<ExtArgs>>): Prisma__SlideClient<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Slides.
     * @param {SlideCreateManyArgs} args - Arguments to create many Slides.
     * @example
     * // Create many Slides
     * const slide = await prisma.slide.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SlideCreateManyArgs>(args?: SelectSubset<T, SlideCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Slides and returns the data saved in the database.
     * @param {SlideCreateManyAndReturnArgs} args - Arguments to create many Slides.
     * @example
     * // Create many Slides
     * const slide = await prisma.slide.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Slides and only return the `id`
     * const slideWithIdOnly = await prisma.slide.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SlideCreateManyAndReturnArgs>(args?: SelectSubset<T, SlideCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Slide.
     * @param {SlideDeleteArgs} args - Arguments to delete one Slide.
     * @example
     * // Delete one Slide
     * const Slide = await prisma.slide.delete({
     *   where: {
     *     // ... filter to delete one Slide
     *   }
     * })
     * 
     */
    delete<T extends SlideDeleteArgs>(args: SelectSubset<T, SlideDeleteArgs<ExtArgs>>): Prisma__SlideClient<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Slide.
     * @param {SlideUpdateArgs} args - Arguments to update one Slide.
     * @example
     * // Update one Slide
     * const slide = await prisma.slide.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SlideUpdateArgs>(args: SelectSubset<T, SlideUpdateArgs<ExtArgs>>): Prisma__SlideClient<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Slides.
     * @param {SlideDeleteManyArgs} args - Arguments to filter Slides to delete.
     * @example
     * // Delete a few Slides
     * const { count } = await prisma.slide.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SlideDeleteManyArgs>(args?: SelectSubset<T, SlideDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Slides
     * const slide = await prisma.slide.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SlideUpdateManyArgs>(args: SelectSubset<T, SlideUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slides and returns the data updated in the database.
     * @param {SlideUpdateManyAndReturnArgs} args - Arguments to update many Slides.
     * @example
     * // Update many Slides
     * const slide = await prisma.slide.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Slides and only return the `id`
     * const slideWithIdOnly = await prisma.slide.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SlideUpdateManyAndReturnArgs>(args: SelectSubset<T, SlideUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Slide.
     * @param {SlideUpsertArgs} args - Arguments to update or create a Slide.
     * @example
     * // Update or create a Slide
     * const slide = await prisma.slide.upsert({
     *   create: {
     *     // ... data to create a Slide
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Slide we want to update
     *   }
     * })
     */
    upsert<T extends SlideUpsertArgs>(args: SelectSubset<T, SlideUpsertArgs<ExtArgs>>): Prisma__SlideClient<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Slides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlideCountArgs} args - Arguments to filter Slides to count.
     * @example
     * // Count the number of Slides
     * const count = await prisma.slide.count({
     *   where: {
     *     // ... the filter for the Slides we want to count
     *   }
     * })
    **/
    count<T extends SlideCountArgs>(
      args?: Subset<T, SlideCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SlideCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Slide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SlideAggregateArgs>(args: Subset<T, SlideAggregateArgs>): Prisma.PrismaPromise<GetSlideAggregateType<T>>

    /**
     * Group by Slide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlideGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SlideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SlideGroupByArgs['orderBy'] }
        : { orderBy?: SlideGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SlideGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlideGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Slide model
   */
  readonly fields: SlideFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Slide.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SlideClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    presentation<T extends PresentationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PresentationDefaultArgs<ExtArgs>>): Prisma__PresentationClient<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    elements<T extends Slide$elementsArgs<ExtArgs> = {}>(args?: Subset<T, Slide$elementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Slide model
   */
  interface SlideFieldRefs {
    readonly id: FieldRef<"Slide", 'String'>
    readonly presentationId: FieldRef<"Slide", 'String'>
    readonly order: FieldRef<"Slide", 'Int'>
    readonly title: FieldRef<"Slide", 'String'>
    readonly content: FieldRef<"Slide", 'Json'>
    readonly background: FieldRef<"Slide", 'Json'>
    readonly transitions: FieldRef<"Slide", 'Json'>
    readonly createdAt: FieldRef<"Slide", 'DateTime'>
    readonly updatedAt: FieldRef<"Slide", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Slide findUnique
   */
  export type SlideFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideInclude<ExtArgs> | null
    /**
     * Filter, which Slide to fetch.
     */
    where: SlideWhereUniqueInput
  }

  /**
   * Slide findUniqueOrThrow
   */
  export type SlideFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideInclude<ExtArgs> | null
    /**
     * Filter, which Slide to fetch.
     */
    where: SlideWhereUniqueInput
  }

  /**
   * Slide findFirst
   */
  export type SlideFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideInclude<ExtArgs> | null
    /**
     * Filter, which Slide to fetch.
     */
    where?: SlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slides to fetch.
     */
    orderBy?: SlideOrderByWithRelationInput | SlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Slides.
     */
    cursor?: SlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Slides.
     */
    distinct?: SlideScalarFieldEnum | SlideScalarFieldEnum[]
  }

  /**
   * Slide findFirstOrThrow
   */
  export type SlideFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideInclude<ExtArgs> | null
    /**
     * Filter, which Slide to fetch.
     */
    where?: SlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slides to fetch.
     */
    orderBy?: SlideOrderByWithRelationInput | SlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Slides.
     */
    cursor?: SlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Slides.
     */
    distinct?: SlideScalarFieldEnum | SlideScalarFieldEnum[]
  }

  /**
   * Slide findMany
   */
  export type SlideFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideInclude<ExtArgs> | null
    /**
     * Filter, which Slides to fetch.
     */
    where?: SlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slides to fetch.
     */
    orderBy?: SlideOrderByWithRelationInput | SlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Slides.
     */
    cursor?: SlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slides.
     */
    skip?: number
    distinct?: SlideScalarFieldEnum | SlideScalarFieldEnum[]
  }

  /**
   * Slide create
   */
  export type SlideCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideInclude<ExtArgs> | null
    /**
     * The data needed to create a Slide.
     */
    data: XOR<SlideCreateInput, SlideUncheckedCreateInput>
  }

  /**
   * Slide createMany
   */
  export type SlideCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Slides.
     */
    data: SlideCreateManyInput | SlideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Slide createManyAndReturn
   */
  export type SlideCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * The data used to create many Slides.
     */
    data: SlideCreateManyInput | SlideCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Slide update
   */
  export type SlideUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideInclude<ExtArgs> | null
    /**
     * The data needed to update a Slide.
     */
    data: XOR<SlideUpdateInput, SlideUncheckedUpdateInput>
    /**
     * Choose, which Slide to update.
     */
    where: SlideWhereUniqueInput
  }

  /**
   * Slide updateMany
   */
  export type SlideUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Slides.
     */
    data: XOR<SlideUpdateManyMutationInput, SlideUncheckedUpdateManyInput>
    /**
     * Filter which Slides to update
     */
    where?: SlideWhereInput
    /**
     * Limit how many Slides to update.
     */
    limit?: number
  }

  /**
   * Slide updateManyAndReturn
   */
  export type SlideUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * The data used to update Slides.
     */
    data: XOR<SlideUpdateManyMutationInput, SlideUncheckedUpdateManyInput>
    /**
     * Filter which Slides to update
     */
    where?: SlideWhereInput
    /**
     * Limit how many Slides to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Slide upsert
   */
  export type SlideUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideInclude<ExtArgs> | null
    /**
     * The filter to search for the Slide to update in case it exists.
     */
    where: SlideWhereUniqueInput
    /**
     * In case the Slide found by the `where` argument doesn't exist, create a new Slide with this data.
     */
    create: XOR<SlideCreateInput, SlideUncheckedCreateInput>
    /**
     * In case the Slide was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SlideUpdateInput, SlideUncheckedUpdateInput>
  }

  /**
   * Slide delete
   */
  export type SlideDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideInclude<ExtArgs> | null
    /**
     * Filter which Slide to delete.
     */
    where: SlideWhereUniqueInput
  }

  /**
   * Slide deleteMany
   */
  export type SlideDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Slides to delete
     */
    where?: SlideWhereInput
    /**
     * Limit how many Slides to delete.
     */
    limit?: number
  }

  /**
   * Slide.elements
   */
  export type Slide$elementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    where?: ElementWhereInput
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    cursor?: ElementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Slide without action
   */
  export type SlideDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slide
     */
    select?: SlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slide
     */
    omit?: SlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlideInclude<ExtArgs> | null
  }


  /**
   * Model Element
   */

  export type AggregateElement = {
    _count: ElementCountAggregateOutputType | null
    _avg: ElementAvgAggregateOutputType | null
    _sum: ElementSumAggregateOutputType | null
    _min: ElementMinAggregateOutputType | null
    _max: ElementMaxAggregateOutputType | null
  }

  export type ElementAvgAggregateOutputType = {
    zIndex: number | null
  }

  export type ElementSumAggregateOutputType = {
    zIndex: number | null
  }

  export type ElementMinAggregateOutputType = {
    id: string | null
    slideId: string | null
    type: $Enums.ElementType | null
    zIndex: number | null
    locked: boolean | null
    visible: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ElementMaxAggregateOutputType = {
    id: string | null
    slideId: string | null
    type: $Enums.ElementType | null
    zIndex: number | null
    locked: boolean | null
    visible: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ElementCountAggregateOutputType = {
    id: number
    slideId: number
    type: number
    content: number
    zIndex: number
    locked: number
    visible: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ElementAvgAggregateInputType = {
    zIndex?: true
  }

  export type ElementSumAggregateInputType = {
    zIndex?: true
  }

  export type ElementMinAggregateInputType = {
    id?: true
    slideId?: true
    type?: true
    zIndex?: true
    locked?: true
    visible?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ElementMaxAggregateInputType = {
    id?: true
    slideId?: true
    type?: true
    zIndex?: true
    locked?: true
    visible?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ElementCountAggregateInputType = {
    id?: true
    slideId?: true
    type?: true
    content?: true
    zIndex?: true
    locked?: true
    visible?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ElementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Element to aggregate.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Elements
    **/
    _count?: true | ElementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElementMaxAggregateInputType
  }

  export type GetElementAggregateType<T extends ElementAggregateArgs> = {
        [P in keyof T & keyof AggregateElement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElement[P]>
      : GetScalarType<T[P], AggregateElement[P]>
  }




  export type ElementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementWhereInput
    orderBy?: ElementOrderByWithAggregationInput | ElementOrderByWithAggregationInput[]
    by: ElementScalarFieldEnum[] | ElementScalarFieldEnum
    having?: ElementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElementCountAggregateInputType | true
    _avg?: ElementAvgAggregateInputType
    _sum?: ElementSumAggregateInputType
    _min?: ElementMinAggregateInputType
    _max?: ElementMaxAggregateInputType
  }

  export type ElementGroupByOutputType = {
    id: string
    slideId: string
    type: $Enums.ElementType
    content: JsonValue
    zIndex: number
    locked: boolean
    visible: boolean
    createdAt: Date
    updatedAt: Date
    _count: ElementCountAggregateOutputType | null
    _avg: ElementAvgAggregateOutputType | null
    _sum: ElementSumAggregateOutputType | null
    _min: ElementMinAggregateOutputType | null
    _max: ElementMaxAggregateOutputType | null
  }

  type GetElementGroupByPayload<T extends ElementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElementGroupByOutputType[P]>
            : GetScalarType<T[P], ElementGroupByOutputType[P]>
        }
      >
    >


  export type ElementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slideId?: boolean
    type?: boolean
    content?: boolean
    zIndex?: boolean
    locked?: boolean
    visible?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slide?: boolean | SlideDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["element"]>

  export type ElementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slideId?: boolean
    type?: boolean
    content?: boolean
    zIndex?: boolean
    locked?: boolean
    visible?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slide?: boolean | SlideDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["element"]>

  export type ElementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slideId?: boolean
    type?: boolean
    content?: boolean
    zIndex?: boolean
    locked?: boolean
    visible?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slide?: boolean | SlideDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["element"]>

  export type ElementSelectScalar = {
    id?: boolean
    slideId?: boolean
    type?: boolean
    content?: boolean
    zIndex?: boolean
    locked?: boolean
    visible?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ElementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slideId" | "type" | "content" | "zIndex" | "locked" | "visible" | "createdAt" | "updatedAt", ExtArgs["result"]["element"]>
  export type ElementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slide?: boolean | SlideDefaultArgs<ExtArgs>
  }
  export type ElementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slide?: boolean | SlideDefaultArgs<ExtArgs>
  }
  export type ElementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slide?: boolean | SlideDefaultArgs<ExtArgs>
  }

  export type $ElementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Element"
    objects: {
      slide: Prisma.$SlidePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slideId: string
      type: $Enums.ElementType
      content: Prisma.JsonValue
      zIndex: number
      locked: boolean
      visible: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["element"]>
    composites: {}
  }

  type ElementGetPayload<S extends boolean | null | undefined | ElementDefaultArgs> = $Result.GetResult<Prisma.$ElementPayload, S>

  type ElementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ElementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElementCountAggregateInputType | true
    }

  export interface ElementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Element'], meta: { name: 'Element' } }
    /**
     * Find zero or one Element that matches the filter.
     * @param {ElementFindUniqueArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElementFindUniqueArgs>(args: SelectSubset<T, ElementFindUniqueArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Element that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ElementFindUniqueOrThrowArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElementFindUniqueOrThrowArgs>(args: SelectSubset<T, ElementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Element that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindFirstArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElementFindFirstArgs>(args?: SelectSubset<T, ElementFindFirstArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Element that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindFirstOrThrowArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElementFindFirstOrThrowArgs>(args?: SelectSubset<T, ElementFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Elements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Elements
     * const elements = await prisma.element.findMany()
     * 
     * // Get first 10 Elements
     * const elements = await prisma.element.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const elementWithIdOnly = await prisma.element.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ElementFindManyArgs>(args?: SelectSubset<T, ElementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Element.
     * @param {ElementCreateArgs} args - Arguments to create a Element.
     * @example
     * // Create one Element
     * const Element = await prisma.element.create({
     *   data: {
     *     // ... data to create a Element
     *   }
     * })
     * 
     */
    create<T extends ElementCreateArgs>(args: SelectSubset<T, ElementCreateArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Elements.
     * @param {ElementCreateManyArgs} args - Arguments to create many Elements.
     * @example
     * // Create many Elements
     * const element = await prisma.element.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElementCreateManyArgs>(args?: SelectSubset<T, ElementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Elements and returns the data saved in the database.
     * @param {ElementCreateManyAndReturnArgs} args - Arguments to create many Elements.
     * @example
     * // Create many Elements
     * const element = await prisma.element.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Elements and only return the `id`
     * const elementWithIdOnly = await prisma.element.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ElementCreateManyAndReturnArgs>(args?: SelectSubset<T, ElementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Element.
     * @param {ElementDeleteArgs} args - Arguments to delete one Element.
     * @example
     * // Delete one Element
     * const Element = await prisma.element.delete({
     *   where: {
     *     // ... filter to delete one Element
     *   }
     * })
     * 
     */
    delete<T extends ElementDeleteArgs>(args: SelectSubset<T, ElementDeleteArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Element.
     * @param {ElementUpdateArgs} args - Arguments to update one Element.
     * @example
     * // Update one Element
     * const element = await prisma.element.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElementUpdateArgs>(args: SelectSubset<T, ElementUpdateArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Elements.
     * @param {ElementDeleteManyArgs} args - Arguments to filter Elements to delete.
     * @example
     * // Delete a few Elements
     * const { count } = await prisma.element.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElementDeleteManyArgs>(args?: SelectSubset<T, ElementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Elements
     * const element = await prisma.element.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElementUpdateManyArgs>(args: SelectSubset<T, ElementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elements and returns the data updated in the database.
     * @param {ElementUpdateManyAndReturnArgs} args - Arguments to update many Elements.
     * @example
     * // Update many Elements
     * const element = await prisma.element.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Elements and only return the `id`
     * const elementWithIdOnly = await prisma.element.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ElementUpdateManyAndReturnArgs>(args: SelectSubset<T, ElementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Element.
     * @param {ElementUpsertArgs} args - Arguments to update or create a Element.
     * @example
     * // Update or create a Element
     * const element = await prisma.element.upsert({
     *   create: {
     *     // ... data to create a Element
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Element we want to update
     *   }
     * })
     */
    upsert<T extends ElementUpsertArgs>(args: SelectSubset<T, ElementUpsertArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Elements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementCountArgs} args - Arguments to filter Elements to count.
     * @example
     * // Count the number of Elements
     * const count = await prisma.element.count({
     *   where: {
     *     // ... the filter for the Elements we want to count
     *   }
     * })
    **/
    count<T extends ElementCountArgs>(
      args?: Subset<T, ElementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Element.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElementAggregateArgs>(args: Subset<T, ElementAggregateArgs>): Prisma.PrismaPromise<GetElementAggregateType<T>>

    /**
     * Group by Element.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElementGroupByArgs['orderBy'] }
        : { orderBy?: ElementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Element model
   */
  readonly fields: ElementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Element.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    slide<T extends SlideDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SlideDefaultArgs<ExtArgs>>): Prisma__SlideClient<$Result.GetResult<Prisma.$SlidePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Element model
   */
  interface ElementFieldRefs {
    readonly id: FieldRef<"Element", 'String'>
    readonly slideId: FieldRef<"Element", 'String'>
    readonly type: FieldRef<"Element", 'ElementType'>
    readonly content: FieldRef<"Element", 'Json'>
    readonly zIndex: FieldRef<"Element", 'Int'>
    readonly locked: FieldRef<"Element", 'Boolean'>
    readonly visible: FieldRef<"Element", 'Boolean'>
    readonly createdAt: FieldRef<"Element", 'DateTime'>
    readonly updatedAt: FieldRef<"Element", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Element findUnique
   */
  export type ElementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element findUniqueOrThrow
   */
  export type ElementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element findFirst
   */
  export type ElementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elements.
     */
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element findFirstOrThrow
   */
  export type ElementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elements.
     */
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element findMany
   */
  export type ElementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Elements to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element create
   */
  export type ElementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The data needed to create a Element.
     */
    data: XOR<ElementCreateInput, ElementUncheckedCreateInput>
  }

  /**
   * Element createMany
   */
  export type ElementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Elements.
     */
    data: ElementCreateManyInput | ElementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Element createManyAndReturn
   */
  export type ElementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * The data used to create many Elements.
     */
    data: ElementCreateManyInput | ElementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Element update
   */
  export type ElementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The data needed to update a Element.
     */
    data: XOR<ElementUpdateInput, ElementUncheckedUpdateInput>
    /**
     * Choose, which Element to update.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element updateMany
   */
  export type ElementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Elements.
     */
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyInput>
    /**
     * Filter which Elements to update
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to update.
     */
    limit?: number
  }

  /**
   * Element updateManyAndReturn
   */
  export type ElementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * The data used to update Elements.
     */
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyInput>
    /**
     * Filter which Elements to update
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Element upsert
   */
  export type ElementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The filter to search for the Element to update in case it exists.
     */
    where: ElementWhereUniqueInput
    /**
     * In case the Element found by the `where` argument doesn't exist, create a new Element with this data.
     */
    create: XOR<ElementCreateInput, ElementUncheckedCreateInput>
    /**
     * In case the Element was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElementUpdateInput, ElementUncheckedUpdateInput>
  }

  /**
   * Element delete
   */
  export type ElementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter which Element to delete.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element deleteMany
   */
  export type ElementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Elements to delete
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to delete.
     */
    limit?: number
  }

  /**
   * Element without action
   */
  export type ElementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
  }


  /**
   * Model Template
   */

  export type AggregateTemplate = {
    _count: TemplateCountAggregateOutputType | null
    _avg: TemplateAvgAggregateOutputType | null
    _sum: TemplateSumAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  export type TemplateAvgAggregateOutputType = {
    downloads: number | null
    rating: number | null
  }

  export type TemplateSumAggregateOutputType = {
    downloads: number | null
    rating: number | null
  }

  export type TemplateMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    thumbnail: string | null
    isPublic: boolean | null
    downloads: number | null
    rating: number | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    thumbnail: string | null
    isPublic: boolean | null
    downloads: number | null
    rating: number | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateCountAggregateOutputType = {
    id: number
    name: number
    description: number
    category: number
    thumbnail: number
    data: number
    tags: number
    isPublic: number
    downloads: number
    rating: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TemplateAvgAggregateInputType = {
    downloads?: true
    rating?: true
  }

  export type TemplateSumAggregateInputType = {
    downloads?: true
    rating?: true
  }

  export type TemplateMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    thumbnail?: true
    isPublic?: true
    downloads?: true
    rating?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    thumbnail?: true
    isPublic?: true
    downloads?: true
    rating?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    thumbnail?: true
    data?: true
    tags?: true
    isPublic?: true
    downloads?: true
    rating?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Template to aggregate.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Templates
    **/
    _count?: true | TemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateMaxAggregateInputType
  }

  export type GetTemplateAggregateType<T extends TemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplate[P]>
      : GetScalarType<T[P], AggregateTemplate[P]>
  }




  export type TemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateWhereInput
    orderBy?: TemplateOrderByWithAggregationInput | TemplateOrderByWithAggregationInput[]
    by: TemplateScalarFieldEnum[] | TemplateScalarFieldEnum
    having?: TemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateCountAggregateInputType | true
    _avg?: TemplateAvgAggregateInputType
    _sum?: TemplateSumAggregateInputType
    _min?: TemplateMinAggregateInputType
    _max?: TemplateMaxAggregateInputType
  }

  export type TemplateGroupByOutputType = {
    id: string
    name: string
    description: string | null
    category: string
    thumbnail: string
    data: JsonValue
    tags: string[]
    isPublic: boolean
    downloads: number
    rating: number
    createdBy: string
    createdAt: Date
    updatedAt: Date
    _count: TemplateCountAggregateOutputType | null
    _avg: TemplateAvgAggregateOutputType | null
    _sum: TemplateSumAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  type GetTemplateGroupByPayload<T extends TemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateGroupByOutputType[P]>
        }
      >
    >


  export type TemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    thumbnail?: boolean
    data?: boolean
    tags?: boolean
    isPublic?: boolean
    downloads?: boolean
    rating?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    thumbnail?: boolean
    data?: boolean
    tags?: boolean
    isPublic?: boolean
    downloads?: boolean
    rating?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    thumbnail?: boolean
    data?: boolean
    tags?: boolean
    isPublic?: boolean
    downloads?: boolean
    rating?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    thumbnail?: boolean
    data?: boolean
    tags?: boolean
    isPublic?: boolean
    downloads?: boolean
    rating?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "category" | "thumbnail" | "data" | "tags" | "isPublic" | "downloads" | "rating" | "createdBy" | "createdAt" | "updatedAt", ExtArgs["result"]["template"]>

  export type $TemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Template"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      category: string
      thumbnail: string
      data: Prisma.JsonValue
      tags: string[]
      isPublic: boolean
      downloads: number
      rating: number
      createdBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["template"]>
    composites: {}
  }

  type TemplateGetPayload<S extends boolean | null | undefined | TemplateDefaultArgs> = $Result.GetResult<Prisma.$TemplatePayload, S>

  type TemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplateCountAggregateInputType | true
    }

  export interface TemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Template'], meta: { name: 'Template' } }
    /**
     * Find zero or one Template that matches the filter.
     * @param {TemplateFindUniqueArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateFindUniqueArgs>(args: SelectSubset<T, TemplateFindUniqueArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Template that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplateFindUniqueOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateFindFirstArgs>(args?: SelectSubset<T, TemplateFindFirstArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Templates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Templates
     * const templates = await prisma.template.findMany()
     * 
     * // Get first 10 Templates
     * const templates = await prisma.template.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateWithIdOnly = await prisma.template.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplateFindManyArgs>(args?: SelectSubset<T, TemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Template.
     * @param {TemplateCreateArgs} args - Arguments to create a Template.
     * @example
     * // Create one Template
     * const Template = await prisma.template.create({
     *   data: {
     *     // ... data to create a Template
     *   }
     * })
     * 
     */
    create<T extends TemplateCreateArgs>(args: SelectSubset<T, TemplateCreateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Templates.
     * @param {TemplateCreateManyArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateCreateManyArgs>(args?: SelectSubset<T, TemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Templates and returns the data saved in the database.
     * @param {TemplateCreateManyAndReturnArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Templates and only return the `id`
     * const templateWithIdOnly = await prisma.template.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, TemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Template.
     * @param {TemplateDeleteArgs} args - Arguments to delete one Template.
     * @example
     * // Delete one Template
     * const Template = await prisma.template.delete({
     *   where: {
     *     // ... filter to delete one Template
     *   }
     * })
     * 
     */
    delete<T extends TemplateDeleteArgs>(args: SelectSubset<T, TemplateDeleteArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Template.
     * @param {TemplateUpdateArgs} args - Arguments to update one Template.
     * @example
     * // Update one Template
     * const template = await prisma.template.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateUpdateArgs>(args: SelectSubset<T, TemplateUpdateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Templates.
     * @param {TemplateDeleteManyArgs} args - Arguments to filter Templates to delete.
     * @example
     * // Delete a few Templates
     * const { count } = await prisma.template.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateDeleteManyArgs>(args?: SelectSubset<T, TemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateUpdateManyArgs>(args: SelectSubset<T, TemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates and returns the data updated in the database.
     * @param {TemplateUpdateManyAndReturnArgs} args - Arguments to update many Templates.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Templates and only return the `id`
     * const templateWithIdOnly = await prisma.template.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, TemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Template.
     * @param {TemplateUpsertArgs} args - Arguments to update or create a Template.
     * @example
     * // Update or create a Template
     * const template = await prisma.template.upsert({
     *   create: {
     *     // ... data to create a Template
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Template we want to update
     *   }
     * })
     */
    upsert<T extends TemplateUpsertArgs>(args: SelectSubset<T, TemplateUpsertArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateCountArgs} args - Arguments to filter Templates to count.
     * @example
     * // Count the number of Templates
     * const count = await prisma.template.count({
     *   where: {
     *     // ... the filter for the Templates we want to count
     *   }
     * })
    **/
    count<T extends TemplateCountArgs>(
      args?: Subset<T, TemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplateAggregateArgs>(args: Subset<T, TemplateAggregateArgs>): Prisma.PrismaPromise<GetTemplateAggregateType<T>>

    /**
     * Group by Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateGroupByArgs['orderBy'] }
        : { orderBy?: TemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Template model
   */
  readonly fields: TemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Template.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Template model
   */
  interface TemplateFieldRefs {
    readonly id: FieldRef<"Template", 'String'>
    readonly name: FieldRef<"Template", 'String'>
    readonly description: FieldRef<"Template", 'String'>
    readonly category: FieldRef<"Template", 'String'>
    readonly thumbnail: FieldRef<"Template", 'String'>
    readonly data: FieldRef<"Template", 'Json'>
    readonly tags: FieldRef<"Template", 'String[]'>
    readonly isPublic: FieldRef<"Template", 'Boolean'>
    readonly downloads: FieldRef<"Template", 'Int'>
    readonly rating: FieldRef<"Template", 'Float'>
    readonly createdBy: FieldRef<"Template", 'String'>
    readonly createdAt: FieldRef<"Template", 'DateTime'>
    readonly updatedAt: FieldRef<"Template", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Template findUnique
   */
  export type TemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findUniqueOrThrow
   */
  export type TemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findFirst
   */
  export type TemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findFirstOrThrow
   */
  export type TemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findMany
   */
  export type TemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter, which Templates to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template create
   */
  export type TemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data needed to create a Template.
     */
    data: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
  }

  /**
   * Template createMany
   */
  export type TemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Templates.
     */
    data: TemplateCreateManyInput | TemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Template createManyAndReturn
   */
  export type TemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data used to create many Templates.
     */
    data: TemplateCreateManyInput | TemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Template update
   */
  export type TemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data needed to update a Template.
     */
    data: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
    /**
     * Choose, which Template to update.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template updateMany
   */
  export type TemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Templates.
     */
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyInput>
    /**
     * Filter which Templates to update
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to update.
     */
    limit?: number
  }

  /**
   * Template updateManyAndReturn
   */
  export type TemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data used to update Templates.
     */
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyInput>
    /**
     * Filter which Templates to update
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to update.
     */
    limit?: number
  }

  /**
   * Template upsert
   */
  export type TemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The filter to search for the Template to update in case it exists.
     */
    where: TemplateWhereUniqueInput
    /**
     * In case the Template found by the `where` argument doesn't exist, create a new Template with this data.
     */
    create: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
    /**
     * In case the Template was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
  }

  /**
   * Template delete
   */
  export type TemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Filter which Template to delete.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template deleteMany
   */
  export type TemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Templates to delete
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to delete.
     */
    limit?: number
  }

  /**
   * Template without action
   */
  export type TemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
  }


  /**
   * Model Collaboration
   */

  export type AggregateCollaboration = {
    _count: CollaborationCountAggregateOutputType | null
    _min: CollaborationMinAggregateOutputType | null
    _max: CollaborationMaxAggregateOutputType | null
  }

  export type CollaborationMinAggregateOutputType = {
    id: string | null
    presentationId: string | null
    userId: string | null
    role: $Enums.CollaborationRole | null
    joinedAt: Date | null
    lastActiveAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CollaborationMaxAggregateOutputType = {
    id: string | null
    presentationId: string | null
    userId: string | null
    role: $Enums.CollaborationRole | null
    joinedAt: Date | null
    lastActiveAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CollaborationCountAggregateOutputType = {
    id: number
    presentationId: number
    userId: number
    role: number
    permissions: number
    joinedAt: number
    lastActiveAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CollaborationMinAggregateInputType = {
    id?: true
    presentationId?: true
    userId?: true
    role?: true
    joinedAt?: true
    lastActiveAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CollaborationMaxAggregateInputType = {
    id?: true
    presentationId?: true
    userId?: true
    role?: true
    joinedAt?: true
    lastActiveAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CollaborationCountAggregateInputType = {
    id?: true
    presentationId?: true
    userId?: true
    role?: true
    permissions?: true
    joinedAt?: true
    lastActiveAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CollaborationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collaboration to aggregate.
     */
    where?: CollaborationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborations to fetch.
     */
    orderBy?: CollaborationOrderByWithRelationInput | CollaborationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CollaborationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Collaborations
    **/
    _count?: true | CollaborationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CollaborationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CollaborationMaxAggregateInputType
  }

  export type GetCollaborationAggregateType<T extends CollaborationAggregateArgs> = {
        [P in keyof T & keyof AggregateCollaboration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCollaboration[P]>
      : GetScalarType<T[P], AggregateCollaboration[P]>
  }




  export type CollaborationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollaborationWhereInput
    orderBy?: CollaborationOrderByWithAggregationInput | CollaborationOrderByWithAggregationInput[]
    by: CollaborationScalarFieldEnum[] | CollaborationScalarFieldEnum
    having?: CollaborationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CollaborationCountAggregateInputType | true
    _min?: CollaborationMinAggregateInputType
    _max?: CollaborationMaxAggregateInputType
  }

  export type CollaborationGroupByOutputType = {
    id: string
    presentationId: string
    userId: string
    role: $Enums.CollaborationRole
    permissions: JsonValue
    joinedAt: Date
    lastActiveAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CollaborationCountAggregateOutputType | null
    _min: CollaborationMinAggregateOutputType | null
    _max: CollaborationMaxAggregateOutputType | null
  }

  type GetCollaborationGroupByPayload<T extends CollaborationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CollaborationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CollaborationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CollaborationGroupByOutputType[P]>
            : GetScalarType<T[P], CollaborationGroupByOutputType[P]>
        }
      >
    >


  export type CollaborationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presentationId?: boolean
    userId?: boolean
    role?: boolean
    permissions?: boolean
    joinedAt?: boolean
    lastActiveAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["collaboration"]>

  export type CollaborationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presentationId?: boolean
    userId?: boolean
    role?: boolean
    permissions?: boolean
    joinedAt?: boolean
    lastActiveAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["collaboration"]>

  export type CollaborationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presentationId?: boolean
    userId?: boolean
    role?: boolean
    permissions?: boolean
    joinedAt?: boolean
    lastActiveAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["collaboration"]>

  export type CollaborationSelectScalar = {
    id?: boolean
    presentationId?: boolean
    userId?: boolean
    role?: boolean
    permissions?: boolean
    joinedAt?: boolean
    lastActiveAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CollaborationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "presentationId" | "userId" | "role" | "permissions" | "joinedAt" | "lastActiveAt" | "createdAt" | "updatedAt", ExtArgs["result"]["collaboration"]>

  export type $CollaborationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Collaboration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      presentationId: string
      userId: string
      role: $Enums.CollaborationRole
      permissions: Prisma.JsonValue
      joinedAt: Date
      lastActiveAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["collaboration"]>
    composites: {}
  }

  type CollaborationGetPayload<S extends boolean | null | undefined | CollaborationDefaultArgs> = $Result.GetResult<Prisma.$CollaborationPayload, S>

  type CollaborationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CollaborationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CollaborationCountAggregateInputType | true
    }

  export interface CollaborationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Collaboration'], meta: { name: 'Collaboration' } }
    /**
     * Find zero or one Collaboration that matches the filter.
     * @param {CollaborationFindUniqueArgs} args - Arguments to find a Collaboration
     * @example
     * // Get one Collaboration
     * const collaboration = await prisma.collaboration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CollaborationFindUniqueArgs>(args: SelectSubset<T, CollaborationFindUniqueArgs<ExtArgs>>): Prisma__CollaborationClient<$Result.GetResult<Prisma.$CollaborationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Collaboration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CollaborationFindUniqueOrThrowArgs} args - Arguments to find a Collaboration
     * @example
     * // Get one Collaboration
     * const collaboration = await prisma.collaboration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CollaborationFindUniqueOrThrowArgs>(args: SelectSubset<T, CollaborationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CollaborationClient<$Result.GetResult<Prisma.$CollaborationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collaboration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborationFindFirstArgs} args - Arguments to find a Collaboration
     * @example
     * // Get one Collaboration
     * const collaboration = await prisma.collaboration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CollaborationFindFirstArgs>(args?: SelectSubset<T, CollaborationFindFirstArgs<ExtArgs>>): Prisma__CollaborationClient<$Result.GetResult<Prisma.$CollaborationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collaboration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborationFindFirstOrThrowArgs} args - Arguments to find a Collaboration
     * @example
     * // Get one Collaboration
     * const collaboration = await prisma.collaboration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CollaborationFindFirstOrThrowArgs>(args?: SelectSubset<T, CollaborationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CollaborationClient<$Result.GetResult<Prisma.$CollaborationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Collaborations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Collaborations
     * const collaborations = await prisma.collaboration.findMany()
     * 
     * // Get first 10 Collaborations
     * const collaborations = await prisma.collaboration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const collaborationWithIdOnly = await prisma.collaboration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CollaborationFindManyArgs>(args?: SelectSubset<T, CollaborationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaborationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Collaboration.
     * @param {CollaborationCreateArgs} args - Arguments to create a Collaboration.
     * @example
     * // Create one Collaboration
     * const Collaboration = await prisma.collaboration.create({
     *   data: {
     *     // ... data to create a Collaboration
     *   }
     * })
     * 
     */
    create<T extends CollaborationCreateArgs>(args: SelectSubset<T, CollaborationCreateArgs<ExtArgs>>): Prisma__CollaborationClient<$Result.GetResult<Prisma.$CollaborationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Collaborations.
     * @param {CollaborationCreateManyArgs} args - Arguments to create many Collaborations.
     * @example
     * // Create many Collaborations
     * const collaboration = await prisma.collaboration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CollaborationCreateManyArgs>(args?: SelectSubset<T, CollaborationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Collaborations and returns the data saved in the database.
     * @param {CollaborationCreateManyAndReturnArgs} args - Arguments to create many Collaborations.
     * @example
     * // Create many Collaborations
     * const collaboration = await prisma.collaboration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Collaborations and only return the `id`
     * const collaborationWithIdOnly = await prisma.collaboration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CollaborationCreateManyAndReturnArgs>(args?: SelectSubset<T, CollaborationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaborationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Collaboration.
     * @param {CollaborationDeleteArgs} args - Arguments to delete one Collaboration.
     * @example
     * // Delete one Collaboration
     * const Collaboration = await prisma.collaboration.delete({
     *   where: {
     *     // ... filter to delete one Collaboration
     *   }
     * })
     * 
     */
    delete<T extends CollaborationDeleteArgs>(args: SelectSubset<T, CollaborationDeleteArgs<ExtArgs>>): Prisma__CollaborationClient<$Result.GetResult<Prisma.$CollaborationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Collaboration.
     * @param {CollaborationUpdateArgs} args - Arguments to update one Collaboration.
     * @example
     * // Update one Collaboration
     * const collaboration = await prisma.collaboration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CollaborationUpdateArgs>(args: SelectSubset<T, CollaborationUpdateArgs<ExtArgs>>): Prisma__CollaborationClient<$Result.GetResult<Prisma.$CollaborationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Collaborations.
     * @param {CollaborationDeleteManyArgs} args - Arguments to filter Collaborations to delete.
     * @example
     * // Delete a few Collaborations
     * const { count } = await prisma.collaboration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CollaborationDeleteManyArgs>(args?: SelectSubset<T, CollaborationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collaborations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Collaborations
     * const collaboration = await prisma.collaboration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CollaborationUpdateManyArgs>(args: SelectSubset<T, CollaborationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collaborations and returns the data updated in the database.
     * @param {CollaborationUpdateManyAndReturnArgs} args - Arguments to update many Collaborations.
     * @example
     * // Update many Collaborations
     * const collaboration = await prisma.collaboration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Collaborations and only return the `id`
     * const collaborationWithIdOnly = await prisma.collaboration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CollaborationUpdateManyAndReturnArgs>(args: SelectSubset<T, CollaborationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaborationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Collaboration.
     * @param {CollaborationUpsertArgs} args - Arguments to update or create a Collaboration.
     * @example
     * // Update or create a Collaboration
     * const collaboration = await prisma.collaboration.upsert({
     *   create: {
     *     // ... data to create a Collaboration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Collaboration we want to update
     *   }
     * })
     */
    upsert<T extends CollaborationUpsertArgs>(args: SelectSubset<T, CollaborationUpsertArgs<ExtArgs>>): Prisma__CollaborationClient<$Result.GetResult<Prisma.$CollaborationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Collaborations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborationCountArgs} args - Arguments to filter Collaborations to count.
     * @example
     * // Count the number of Collaborations
     * const count = await prisma.collaboration.count({
     *   where: {
     *     // ... the filter for the Collaborations we want to count
     *   }
     * })
    **/
    count<T extends CollaborationCountArgs>(
      args?: Subset<T, CollaborationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CollaborationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Collaboration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CollaborationAggregateArgs>(args: Subset<T, CollaborationAggregateArgs>): Prisma.PrismaPromise<GetCollaborationAggregateType<T>>

    /**
     * Group by Collaboration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CollaborationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CollaborationGroupByArgs['orderBy'] }
        : { orderBy?: CollaborationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CollaborationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollaborationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Collaboration model
   */
  readonly fields: CollaborationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Collaboration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CollaborationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Collaboration model
   */
  interface CollaborationFieldRefs {
    readonly id: FieldRef<"Collaboration", 'String'>
    readonly presentationId: FieldRef<"Collaboration", 'String'>
    readonly userId: FieldRef<"Collaboration", 'String'>
    readonly role: FieldRef<"Collaboration", 'CollaborationRole'>
    readonly permissions: FieldRef<"Collaboration", 'Json'>
    readonly joinedAt: FieldRef<"Collaboration", 'DateTime'>
    readonly lastActiveAt: FieldRef<"Collaboration", 'DateTime'>
    readonly createdAt: FieldRef<"Collaboration", 'DateTime'>
    readonly updatedAt: FieldRef<"Collaboration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Collaboration findUnique
   */
  export type CollaborationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
    /**
     * Filter, which Collaboration to fetch.
     */
    where: CollaborationWhereUniqueInput
  }

  /**
   * Collaboration findUniqueOrThrow
   */
  export type CollaborationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
    /**
     * Filter, which Collaboration to fetch.
     */
    where: CollaborationWhereUniqueInput
  }

  /**
   * Collaboration findFirst
   */
  export type CollaborationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
    /**
     * Filter, which Collaboration to fetch.
     */
    where?: CollaborationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborations to fetch.
     */
    orderBy?: CollaborationOrderByWithRelationInput | CollaborationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collaborations.
     */
    cursor?: CollaborationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collaborations.
     */
    distinct?: CollaborationScalarFieldEnum | CollaborationScalarFieldEnum[]
  }

  /**
   * Collaboration findFirstOrThrow
   */
  export type CollaborationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
    /**
     * Filter, which Collaboration to fetch.
     */
    where?: CollaborationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborations to fetch.
     */
    orderBy?: CollaborationOrderByWithRelationInput | CollaborationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collaborations.
     */
    cursor?: CollaborationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collaborations.
     */
    distinct?: CollaborationScalarFieldEnum | CollaborationScalarFieldEnum[]
  }

  /**
   * Collaboration findMany
   */
  export type CollaborationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
    /**
     * Filter, which Collaborations to fetch.
     */
    where?: CollaborationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborations to fetch.
     */
    orderBy?: CollaborationOrderByWithRelationInput | CollaborationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Collaborations.
     */
    cursor?: CollaborationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborations.
     */
    skip?: number
    distinct?: CollaborationScalarFieldEnum | CollaborationScalarFieldEnum[]
  }

  /**
   * Collaboration create
   */
  export type CollaborationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
    /**
     * The data needed to create a Collaboration.
     */
    data: XOR<CollaborationCreateInput, CollaborationUncheckedCreateInput>
  }

  /**
   * Collaboration createMany
   */
  export type CollaborationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Collaborations.
     */
    data: CollaborationCreateManyInput | CollaborationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Collaboration createManyAndReturn
   */
  export type CollaborationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
    /**
     * The data used to create many Collaborations.
     */
    data: CollaborationCreateManyInput | CollaborationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Collaboration update
   */
  export type CollaborationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
    /**
     * The data needed to update a Collaboration.
     */
    data: XOR<CollaborationUpdateInput, CollaborationUncheckedUpdateInput>
    /**
     * Choose, which Collaboration to update.
     */
    where: CollaborationWhereUniqueInput
  }

  /**
   * Collaboration updateMany
   */
  export type CollaborationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Collaborations.
     */
    data: XOR<CollaborationUpdateManyMutationInput, CollaborationUncheckedUpdateManyInput>
    /**
     * Filter which Collaborations to update
     */
    where?: CollaborationWhereInput
    /**
     * Limit how many Collaborations to update.
     */
    limit?: number
  }

  /**
   * Collaboration updateManyAndReturn
   */
  export type CollaborationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
    /**
     * The data used to update Collaborations.
     */
    data: XOR<CollaborationUpdateManyMutationInput, CollaborationUncheckedUpdateManyInput>
    /**
     * Filter which Collaborations to update
     */
    where?: CollaborationWhereInput
    /**
     * Limit how many Collaborations to update.
     */
    limit?: number
  }

  /**
   * Collaboration upsert
   */
  export type CollaborationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
    /**
     * The filter to search for the Collaboration to update in case it exists.
     */
    where: CollaborationWhereUniqueInput
    /**
     * In case the Collaboration found by the `where` argument doesn't exist, create a new Collaboration with this data.
     */
    create: XOR<CollaborationCreateInput, CollaborationUncheckedCreateInput>
    /**
     * In case the Collaboration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CollaborationUpdateInput, CollaborationUncheckedUpdateInput>
  }

  /**
   * Collaboration delete
   */
  export type CollaborationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
    /**
     * Filter which Collaboration to delete.
     */
    where: CollaborationWhereUniqueInput
  }

  /**
   * Collaboration deleteMany
   */
  export type CollaborationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collaborations to delete
     */
    where?: CollaborationWhereInput
    /**
     * Limit how many Collaborations to delete.
     */
    limit?: number
  }

  /**
   * Collaboration without action
   */
  export type CollaborationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaboration
     */
    select?: CollaborationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaboration
     */
    omit?: CollaborationOmit<ExtArgs> | null
  }


  /**
   * Model Presence
   */

  export type AggregatePresence = {
    _count: PresenceCountAggregateOutputType | null
    _min: PresenceMinAggregateOutputType | null
    _max: PresenceMaxAggregateOutputType | null
  }

  export type PresenceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    presentationId: string | null
    socketId: string | null
    status: $Enums.UserStatus | null
    lastSeen: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PresenceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    presentationId: string | null
    socketId: string | null
    status: $Enums.UserStatus | null
    lastSeen: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PresenceCountAggregateOutputType = {
    id: number
    userId: number
    presentationId: number
    socketId: number
    cursor: number
    status: number
    lastSeen: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PresenceMinAggregateInputType = {
    id?: true
    userId?: true
    presentationId?: true
    socketId?: true
    status?: true
    lastSeen?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PresenceMaxAggregateInputType = {
    id?: true
    userId?: true
    presentationId?: true
    socketId?: true
    status?: true
    lastSeen?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PresenceCountAggregateInputType = {
    id?: true
    userId?: true
    presentationId?: true
    socketId?: true
    cursor?: true
    status?: true
    lastSeen?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PresenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Presence to aggregate.
     */
    where?: PresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presences to fetch.
     */
    orderBy?: PresenceOrderByWithRelationInput | PresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Presences
    **/
    _count?: true | PresenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PresenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PresenceMaxAggregateInputType
  }

  export type GetPresenceAggregateType<T extends PresenceAggregateArgs> = {
        [P in keyof T & keyof AggregatePresence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePresence[P]>
      : GetScalarType<T[P], AggregatePresence[P]>
  }




  export type PresenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PresenceWhereInput
    orderBy?: PresenceOrderByWithAggregationInput | PresenceOrderByWithAggregationInput[]
    by: PresenceScalarFieldEnum[] | PresenceScalarFieldEnum
    having?: PresenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PresenceCountAggregateInputType | true
    _min?: PresenceMinAggregateInputType
    _max?: PresenceMaxAggregateInputType
  }

  export type PresenceGroupByOutputType = {
    id: string
    userId: string
    presentationId: string | null
    socketId: string
    cursor: JsonValue | null
    status: $Enums.UserStatus
    lastSeen: Date
    createdAt: Date
    updatedAt: Date
    _count: PresenceCountAggregateOutputType | null
    _min: PresenceMinAggregateOutputType | null
    _max: PresenceMaxAggregateOutputType | null
  }

  type GetPresenceGroupByPayload<T extends PresenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PresenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PresenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PresenceGroupByOutputType[P]>
            : GetScalarType<T[P], PresenceGroupByOutputType[P]>
        }
      >
    >


  export type PresenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    presentationId?: boolean
    socketId?: boolean
    cursor?: boolean
    status?: boolean
    lastSeen?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["presence"]>

  export type PresenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    presentationId?: boolean
    socketId?: boolean
    cursor?: boolean
    status?: boolean
    lastSeen?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["presence"]>

  export type PresenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    presentationId?: boolean
    socketId?: boolean
    cursor?: boolean
    status?: boolean
    lastSeen?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["presence"]>

  export type PresenceSelectScalar = {
    id?: boolean
    userId?: boolean
    presentationId?: boolean
    socketId?: boolean
    cursor?: boolean
    status?: boolean
    lastSeen?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PresenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "presentationId" | "socketId" | "cursor" | "status" | "lastSeen" | "createdAt" | "updatedAt", ExtArgs["result"]["presence"]>

  export type $PresencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Presence"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      presentationId: string | null
      socketId: string
      cursor: Prisma.JsonValue | null
      status: $Enums.UserStatus
      lastSeen: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["presence"]>
    composites: {}
  }

  type PresenceGetPayload<S extends boolean | null | undefined | PresenceDefaultArgs> = $Result.GetResult<Prisma.$PresencePayload, S>

  type PresenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PresenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PresenceCountAggregateInputType | true
    }

  export interface PresenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Presence'], meta: { name: 'Presence' } }
    /**
     * Find zero or one Presence that matches the filter.
     * @param {PresenceFindUniqueArgs} args - Arguments to find a Presence
     * @example
     * // Get one Presence
     * const presence = await prisma.presence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PresenceFindUniqueArgs>(args: SelectSubset<T, PresenceFindUniqueArgs<ExtArgs>>): Prisma__PresenceClient<$Result.GetResult<Prisma.$PresencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Presence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PresenceFindUniqueOrThrowArgs} args - Arguments to find a Presence
     * @example
     * // Get one Presence
     * const presence = await prisma.presence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PresenceFindUniqueOrThrowArgs>(args: SelectSubset<T, PresenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PresenceClient<$Result.GetResult<Prisma.$PresencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Presence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresenceFindFirstArgs} args - Arguments to find a Presence
     * @example
     * // Get one Presence
     * const presence = await prisma.presence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PresenceFindFirstArgs>(args?: SelectSubset<T, PresenceFindFirstArgs<ExtArgs>>): Prisma__PresenceClient<$Result.GetResult<Prisma.$PresencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Presence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresenceFindFirstOrThrowArgs} args - Arguments to find a Presence
     * @example
     * // Get one Presence
     * const presence = await prisma.presence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PresenceFindFirstOrThrowArgs>(args?: SelectSubset<T, PresenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__PresenceClient<$Result.GetResult<Prisma.$PresencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Presences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Presences
     * const presences = await prisma.presence.findMany()
     * 
     * // Get first 10 Presences
     * const presences = await prisma.presence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const presenceWithIdOnly = await prisma.presence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PresenceFindManyArgs>(args?: SelectSubset<T, PresenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Presence.
     * @param {PresenceCreateArgs} args - Arguments to create a Presence.
     * @example
     * // Create one Presence
     * const Presence = await prisma.presence.create({
     *   data: {
     *     // ... data to create a Presence
     *   }
     * })
     * 
     */
    create<T extends PresenceCreateArgs>(args: SelectSubset<T, PresenceCreateArgs<ExtArgs>>): Prisma__PresenceClient<$Result.GetResult<Prisma.$PresencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Presences.
     * @param {PresenceCreateManyArgs} args - Arguments to create many Presences.
     * @example
     * // Create many Presences
     * const presence = await prisma.presence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PresenceCreateManyArgs>(args?: SelectSubset<T, PresenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Presences and returns the data saved in the database.
     * @param {PresenceCreateManyAndReturnArgs} args - Arguments to create many Presences.
     * @example
     * // Create many Presences
     * const presence = await prisma.presence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Presences and only return the `id`
     * const presenceWithIdOnly = await prisma.presence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PresenceCreateManyAndReturnArgs>(args?: SelectSubset<T, PresenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Presence.
     * @param {PresenceDeleteArgs} args - Arguments to delete one Presence.
     * @example
     * // Delete one Presence
     * const Presence = await prisma.presence.delete({
     *   where: {
     *     // ... filter to delete one Presence
     *   }
     * })
     * 
     */
    delete<T extends PresenceDeleteArgs>(args: SelectSubset<T, PresenceDeleteArgs<ExtArgs>>): Prisma__PresenceClient<$Result.GetResult<Prisma.$PresencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Presence.
     * @param {PresenceUpdateArgs} args - Arguments to update one Presence.
     * @example
     * // Update one Presence
     * const presence = await prisma.presence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PresenceUpdateArgs>(args: SelectSubset<T, PresenceUpdateArgs<ExtArgs>>): Prisma__PresenceClient<$Result.GetResult<Prisma.$PresencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Presences.
     * @param {PresenceDeleteManyArgs} args - Arguments to filter Presences to delete.
     * @example
     * // Delete a few Presences
     * const { count } = await prisma.presence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PresenceDeleteManyArgs>(args?: SelectSubset<T, PresenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Presences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Presences
     * const presence = await prisma.presence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PresenceUpdateManyArgs>(args: SelectSubset<T, PresenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Presences and returns the data updated in the database.
     * @param {PresenceUpdateManyAndReturnArgs} args - Arguments to update many Presences.
     * @example
     * // Update many Presences
     * const presence = await prisma.presence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Presences and only return the `id`
     * const presenceWithIdOnly = await prisma.presence.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PresenceUpdateManyAndReturnArgs>(args: SelectSubset<T, PresenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Presence.
     * @param {PresenceUpsertArgs} args - Arguments to update or create a Presence.
     * @example
     * // Update or create a Presence
     * const presence = await prisma.presence.upsert({
     *   create: {
     *     // ... data to create a Presence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Presence we want to update
     *   }
     * })
     */
    upsert<T extends PresenceUpsertArgs>(args: SelectSubset<T, PresenceUpsertArgs<ExtArgs>>): Prisma__PresenceClient<$Result.GetResult<Prisma.$PresencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Presences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresenceCountArgs} args - Arguments to filter Presences to count.
     * @example
     * // Count the number of Presences
     * const count = await prisma.presence.count({
     *   where: {
     *     // ... the filter for the Presences we want to count
     *   }
     * })
    **/
    count<T extends PresenceCountArgs>(
      args?: Subset<T, PresenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PresenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Presence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PresenceAggregateArgs>(args: Subset<T, PresenceAggregateArgs>): Prisma.PrismaPromise<GetPresenceAggregateType<T>>

    /**
     * Group by Presence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PresenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PresenceGroupByArgs['orderBy'] }
        : { orderBy?: PresenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PresenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPresenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Presence model
   */
  readonly fields: PresenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Presence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PresenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Presence model
   */
  interface PresenceFieldRefs {
    readonly id: FieldRef<"Presence", 'String'>
    readonly userId: FieldRef<"Presence", 'String'>
    readonly presentationId: FieldRef<"Presence", 'String'>
    readonly socketId: FieldRef<"Presence", 'String'>
    readonly cursor: FieldRef<"Presence", 'Json'>
    readonly status: FieldRef<"Presence", 'UserStatus'>
    readonly lastSeen: FieldRef<"Presence", 'DateTime'>
    readonly createdAt: FieldRef<"Presence", 'DateTime'>
    readonly updatedAt: FieldRef<"Presence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Presence findUnique
   */
  export type PresenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
    /**
     * Filter, which Presence to fetch.
     */
    where: PresenceWhereUniqueInput
  }

  /**
   * Presence findUniqueOrThrow
   */
  export type PresenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
    /**
     * Filter, which Presence to fetch.
     */
    where: PresenceWhereUniqueInput
  }

  /**
   * Presence findFirst
   */
  export type PresenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
    /**
     * Filter, which Presence to fetch.
     */
    where?: PresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presences to fetch.
     */
    orderBy?: PresenceOrderByWithRelationInput | PresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Presences.
     */
    cursor?: PresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Presences.
     */
    distinct?: PresenceScalarFieldEnum | PresenceScalarFieldEnum[]
  }

  /**
   * Presence findFirstOrThrow
   */
  export type PresenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
    /**
     * Filter, which Presence to fetch.
     */
    where?: PresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presences to fetch.
     */
    orderBy?: PresenceOrderByWithRelationInput | PresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Presences.
     */
    cursor?: PresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Presences.
     */
    distinct?: PresenceScalarFieldEnum | PresenceScalarFieldEnum[]
  }

  /**
   * Presence findMany
   */
  export type PresenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
    /**
     * Filter, which Presences to fetch.
     */
    where?: PresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presences to fetch.
     */
    orderBy?: PresenceOrderByWithRelationInput | PresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Presences.
     */
    cursor?: PresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presences.
     */
    skip?: number
    distinct?: PresenceScalarFieldEnum | PresenceScalarFieldEnum[]
  }

  /**
   * Presence create
   */
  export type PresenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
    /**
     * The data needed to create a Presence.
     */
    data: XOR<PresenceCreateInput, PresenceUncheckedCreateInput>
  }

  /**
   * Presence createMany
   */
  export type PresenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Presences.
     */
    data: PresenceCreateManyInput | PresenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Presence createManyAndReturn
   */
  export type PresenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
    /**
     * The data used to create many Presences.
     */
    data: PresenceCreateManyInput | PresenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Presence update
   */
  export type PresenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
    /**
     * The data needed to update a Presence.
     */
    data: XOR<PresenceUpdateInput, PresenceUncheckedUpdateInput>
    /**
     * Choose, which Presence to update.
     */
    where: PresenceWhereUniqueInput
  }

  /**
   * Presence updateMany
   */
  export type PresenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Presences.
     */
    data: XOR<PresenceUpdateManyMutationInput, PresenceUncheckedUpdateManyInput>
    /**
     * Filter which Presences to update
     */
    where?: PresenceWhereInput
    /**
     * Limit how many Presences to update.
     */
    limit?: number
  }

  /**
   * Presence updateManyAndReturn
   */
  export type PresenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
    /**
     * The data used to update Presences.
     */
    data: XOR<PresenceUpdateManyMutationInput, PresenceUncheckedUpdateManyInput>
    /**
     * Filter which Presences to update
     */
    where?: PresenceWhereInput
    /**
     * Limit how many Presences to update.
     */
    limit?: number
  }

  /**
   * Presence upsert
   */
  export type PresenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
    /**
     * The filter to search for the Presence to update in case it exists.
     */
    where: PresenceWhereUniqueInput
    /**
     * In case the Presence found by the `where` argument doesn't exist, create a new Presence with this data.
     */
    create: XOR<PresenceCreateInput, PresenceUncheckedCreateInput>
    /**
     * In case the Presence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PresenceUpdateInput, PresenceUncheckedUpdateInput>
  }

  /**
   * Presence delete
   */
  export type PresenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
    /**
     * Filter which Presence to delete.
     */
    where: PresenceWhereUniqueInput
  }

  /**
   * Presence deleteMany
   */
  export type PresenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Presences to delete
     */
    where?: PresenceWhereInput
    /**
     * Limit how many Presences to delete.
     */
    limit?: number
  }

  /**
   * Presence without action
   */
  export type PresenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presence
     */
    select?: PresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presence
     */
    omit?: PresenceOmit<ExtArgs> | null
  }


  /**
   * Model StorageFile
   */

  export type AggregateStorageFile = {
    _count: StorageFileCountAggregateOutputType | null
    _avg: StorageFileAvgAggregateOutputType | null
    _sum: StorageFileSumAggregateOutputType | null
    _min: StorageFileMinAggregateOutputType | null
    _max: StorageFileMaxAggregateOutputType | null
  }

  export type StorageFileAvgAggregateOutputType = {
    size: number | null
    downloads: number | null
  }

  export type StorageFileSumAggregateOutputType = {
    size: number | null
    downloads: number | null
  }

  export type StorageFileMinAggregateOutputType = {
    id: string | null
    originalName: string | null
    filename: string | null
    mimeType: string | null
    size: number | null
    url: string | null
    key: string | null
    bucket: string | null
    region: string | null
    uploadedBy: string | null
    isPublic: boolean | null
    downloads: number | null
    createdAt: Date | null
    updatedAt: Date | null
    entry: string | null
  }

  export type StorageFileMaxAggregateOutputType = {
    id: string | null
    originalName: string | null
    filename: string | null
    mimeType: string | null
    size: number | null
    url: string | null
    key: string | null
    bucket: string | null
    region: string | null
    uploadedBy: string | null
    isPublic: boolean | null
    downloads: number | null
    createdAt: Date | null
    updatedAt: Date | null
    entry: string | null
  }

  export type StorageFileCountAggregateOutputType = {
    id: number
    originalName: number
    filename: number
    mimeType: number
    size: number
    url: number
    key: number
    bucket: number
    region: number
    uploadedBy: number
    isPublic: number
    downloads: number
    createdAt: number
    updatedAt: number
    entry: number
    _all: number
  }


  export type StorageFileAvgAggregateInputType = {
    size?: true
    downloads?: true
  }

  export type StorageFileSumAggregateInputType = {
    size?: true
    downloads?: true
  }

  export type StorageFileMinAggregateInputType = {
    id?: true
    originalName?: true
    filename?: true
    mimeType?: true
    size?: true
    url?: true
    key?: true
    bucket?: true
    region?: true
    uploadedBy?: true
    isPublic?: true
    downloads?: true
    createdAt?: true
    updatedAt?: true
    entry?: true
  }

  export type StorageFileMaxAggregateInputType = {
    id?: true
    originalName?: true
    filename?: true
    mimeType?: true
    size?: true
    url?: true
    key?: true
    bucket?: true
    region?: true
    uploadedBy?: true
    isPublic?: true
    downloads?: true
    createdAt?: true
    updatedAt?: true
    entry?: true
  }

  export type StorageFileCountAggregateInputType = {
    id?: true
    originalName?: true
    filename?: true
    mimeType?: true
    size?: true
    url?: true
    key?: true
    bucket?: true
    region?: true
    uploadedBy?: true
    isPublic?: true
    downloads?: true
    createdAt?: true
    updatedAt?: true
    entry?: true
    _all?: true
  }

  export type StorageFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorageFile to aggregate.
     */
    where?: StorageFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorageFiles to fetch.
     */
    orderBy?: StorageFileOrderByWithRelationInput | StorageFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StorageFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorageFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorageFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StorageFiles
    **/
    _count?: true | StorageFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StorageFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StorageFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StorageFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StorageFileMaxAggregateInputType
  }

  export type GetStorageFileAggregateType<T extends StorageFileAggregateArgs> = {
        [P in keyof T & keyof AggregateStorageFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStorageFile[P]>
      : GetScalarType<T[P], AggregateStorageFile[P]>
  }




  export type StorageFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorageFileWhereInput
    orderBy?: StorageFileOrderByWithAggregationInput | StorageFileOrderByWithAggregationInput[]
    by: StorageFileScalarFieldEnum[] | StorageFileScalarFieldEnum
    having?: StorageFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StorageFileCountAggregateInputType | true
    _avg?: StorageFileAvgAggregateInputType
    _sum?: StorageFileSumAggregateInputType
    _min?: StorageFileMinAggregateInputType
    _max?: StorageFileMaxAggregateInputType
  }

  export type StorageFileGroupByOutputType = {
    id: string
    originalName: string
    filename: string
    mimeType: string
    size: number
    url: string
    key: string
    bucket: string
    region: string
    uploadedBy: string
    isPublic: boolean
    downloads: number
    createdAt: Date
    updatedAt: Date
    entry: string
    _count: StorageFileCountAggregateOutputType | null
    _avg: StorageFileAvgAggregateOutputType | null
    _sum: StorageFileSumAggregateOutputType | null
    _min: StorageFileMinAggregateOutputType | null
    _max: StorageFileMaxAggregateOutputType | null
  }

  type GetStorageFileGroupByPayload<T extends StorageFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StorageFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StorageFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StorageFileGroupByOutputType[P]>
            : GetScalarType<T[P], StorageFileGroupByOutputType[P]>
        }
      >
    >


  export type StorageFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originalName?: boolean
    filename?: boolean
    mimeType?: boolean
    size?: boolean
    url?: boolean
    key?: boolean
    bucket?: boolean
    region?: boolean
    uploadedBy?: boolean
    isPublic?: boolean
    downloads?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entry?: boolean
  }, ExtArgs["result"]["storageFile"]>

  export type StorageFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originalName?: boolean
    filename?: boolean
    mimeType?: boolean
    size?: boolean
    url?: boolean
    key?: boolean
    bucket?: boolean
    region?: boolean
    uploadedBy?: boolean
    isPublic?: boolean
    downloads?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entry?: boolean
  }, ExtArgs["result"]["storageFile"]>

  export type StorageFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originalName?: boolean
    filename?: boolean
    mimeType?: boolean
    size?: boolean
    url?: boolean
    key?: boolean
    bucket?: boolean
    region?: boolean
    uploadedBy?: boolean
    isPublic?: boolean
    downloads?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entry?: boolean
  }, ExtArgs["result"]["storageFile"]>

  export type StorageFileSelectScalar = {
    id?: boolean
    originalName?: boolean
    filename?: boolean
    mimeType?: boolean
    size?: boolean
    url?: boolean
    key?: boolean
    bucket?: boolean
    region?: boolean
    uploadedBy?: boolean
    isPublic?: boolean
    downloads?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entry?: boolean
  }

  export type StorageFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "originalName" | "filename" | "mimeType" | "size" | "url" | "key" | "bucket" | "region" | "uploadedBy" | "isPublic" | "downloads" | "createdAt" | "updatedAt" | "entry", ExtArgs["result"]["storageFile"]>

  export type $StorageFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StorageFile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      originalName: string
      filename: string
      mimeType: string
      size: number
      url: string
      key: string
      bucket: string
      region: string
      uploadedBy: string
      isPublic: boolean
      downloads: number
      createdAt: Date
      updatedAt: Date
      entry: string
    }, ExtArgs["result"]["storageFile"]>
    composites: {}
  }

  type StorageFileGetPayload<S extends boolean | null | undefined | StorageFileDefaultArgs> = $Result.GetResult<Prisma.$StorageFilePayload, S>

  type StorageFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StorageFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StorageFileCountAggregateInputType | true
    }

  export interface StorageFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StorageFile'], meta: { name: 'StorageFile' } }
    /**
     * Find zero or one StorageFile that matches the filter.
     * @param {StorageFileFindUniqueArgs} args - Arguments to find a StorageFile
     * @example
     * // Get one StorageFile
     * const storageFile = await prisma.storageFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StorageFileFindUniqueArgs>(args: SelectSubset<T, StorageFileFindUniqueArgs<ExtArgs>>): Prisma__StorageFileClient<$Result.GetResult<Prisma.$StorageFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StorageFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StorageFileFindUniqueOrThrowArgs} args - Arguments to find a StorageFile
     * @example
     * // Get one StorageFile
     * const storageFile = await prisma.storageFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StorageFileFindUniqueOrThrowArgs>(args: SelectSubset<T, StorageFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StorageFileClient<$Result.GetResult<Prisma.$StorageFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorageFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageFileFindFirstArgs} args - Arguments to find a StorageFile
     * @example
     * // Get one StorageFile
     * const storageFile = await prisma.storageFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StorageFileFindFirstArgs>(args?: SelectSubset<T, StorageFileFindFirstArgs<ExtArgs>>): Prisma__StorageFileClient<$Result.GetResult<Prisma.$StorageFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorageFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageFileFindFirstOrThrowArgs} args - Arguments to find a StorageFile
     * @example
     * // Get one StorageFile
     * const storageFile = await prisma.storageFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StorageFileFindFirstOrThrowArgs>(args?: SelectSubset<T, StorageFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__StorageFileClient<$Result.GetResult<Prisma.$StorageFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StorageFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StorageFiles
     * const storageFiles = await prisma.storageFile.findMany()
     * 
     * // Get first 10 StorageFiles
     * const storageFiles = await prisma.storageFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storageFileWithIdOnly = await prisma.storageFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StorageFileFindManyArgs>(args?: SelectSubset<T, StorageFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorageFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StorageFile.
     * @param {StorageFileCreateArgs} args - Arguments to create a StorageFile.
     * @example
     * // Create one StorageFile
     * const StorageFile = await prisma.storageFile.create({
     *   data: {
     *     // ... data to create a StorageFile
     *   }
     * })
     * 
     */
    create<T extends StorageFileCreateArgs>(args: SelectSubset<T, StorageFileCreateArgs<ExtArgs>>): Prisma__StorageFileClient<$Result.GetResult<Prisma.$StorageFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StorageFiles.
     * @param {StorageFileCreateManyArgs} args - Arguments to create many StorageFiles.
     * @example
     * // Create many StorageFiles
     * const storageFile = await prisma.storageFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StorageFileCreateManyArgs>(args?: SelectSubset<T, StorageFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StorageFiles and returns the data saved in the database.
     * @param {StorageFileCreateManyAndReturnArgs} args - Arguments to create many StorageFiles.
     * @example
     * // Create many StorageFiles
     * const storageFile = await prisma.storageFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StorageFiles and only return the `id`
     * const storageFileWithIdOnly = await prisma.storageFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StorageFileCreateManyAndReturnArgs>(args?: SelectSubset<T, StorageFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorageFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StorageFile.
     * @param {StorageFileDeleteArgs} args - Arguments to delete one StorageFile.
     * @example
     * // Delete one StorageFile
     * const StorageFile = await prisma.storageFile.delete({
     *   where: {
     *     // ... filter to delete one StorageFile
     *   }
     * })
     * 
     */
    delete<T extends StorageFileDeleteArgs>(args: SelectSubset<T, StorageFileDeleteArgs<ExtArgs>>): Prisma__StorageFileClient<$Result.GetResult<Prisma.$StorageFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StorageFile.
     * @param {StorageFileUpdateArgs} args - Arguments to update one StorageFile.
     * @example
     * // Update one StorageFile
     * const storageFile = await prisma.storageFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StorageFileUpdateArgs>(args: SelectSubset<T, StorageFileUpdateArgs<ExtArgs>>): Prisma__StorageFileClient<$Result.GetResult<Prisma.$StorageFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StorageFiles.
     * @param {StorageFileDeleteManyArgs} args - Arguments to filter StorageFiles to delete.
     * @example
     * // Delete a few StorageFiles
     * const { count } = await prisma.storageFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StorageFileDeleteManyArgs>(args?: SelectSubset<T, StorageFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorageFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StorageFiles
     * const storageFile = await prisma.storageFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StorageFileUpdateManyArgs>(args: SelectSubset<T, StorageFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorageFiles and returns the data updated in the database.
     * @param {StorageFileUpdateManyAndReturnArgs} args - Arguments to update many StorageFiles.
     * @example
     * // Update many StorageFiles
     * const storageFile = await prisma.storageFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StorageFiles and only return the `id`
     * const storageFileWithIdOnly = await prisma.storageFile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StorageFileUpdateManyAndReturnArgs>(args: SelectSubset<T, StorageFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorageFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StorageFile.
     * @param {StorageFileUpsertArgs} args - Arguments to update or create a StorageFile.
     * @example
     * // Update or create a StorageFile
     * const storageFile = await prisma.storageFile.upsert({
     *   create: {
     *     // ... data to create a StorageFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StorageFile we want to update
     *   }
     * })
     */
    upsert<T extends StorageFileUpsertArgs>(args: SelectSubset<T, StorageFileUpsertArgs<ExtArgs>>): Prisma__StorageFileClient<$Result.GetResult<Prisma.$StorageFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StorageFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageFileCountArgs} args - Arguments to filter StorageFiles to count.
     * @example
     * // Count the number of StorageFiles
     * const count = await prisma.storageFile.count({
     *   where: {
     *     // ... the filter for the StorageFiles we want to count
     *   }
     * })
    **/
    count<T extends StorageFileCountArgs>(
      args?: Subset<T, StorageFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StorageFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StorageFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StorageFileAggregateArgs>(args: Subset<T, StorageFileAggregateArgs>): Prisma.PrismaPromise<GetStorageFileAggregateType<T>>

    /**
     * Group by StorageFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageFileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StorageFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StorageFileGroupByArgs['orderBy'] }
        : { orderBy?: StorageFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StorageFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStorageFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StorageFile model
   */
  readonly fields: StorageFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StorageFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StorageFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StorageFile model
   */
  interface StorageFileFieldRefs {
    readonly id: FieldRef<"StorageFile", 'String'>
    readonly originalName: FieldRef<"StorageFile", 'String'>
    readonly filename: FieldRef<"StorageFile", 'String'>
    readonly mimeType: FieldRef<"StorageFile", 'String'>
    readonly size: FieldRef<"StorageFile", 'Int'>
    readonly url: FieldRef<"StorageFile", 'String'>
    readonly key: FieldRef<"StorageFile", 'String'>
    readonly bucket: FieldRef<"StorageFile", 'String'>
    readonly region: FieldRef<"StorageFile", 'String'>
    readonly uploadedBy: FieldRef<"StorageFile", 'String'>
    readonly isPublic: FieldRef<"StorageFile", 'Boolean'>
    readonly downloads: FieldRef<"StorageFile", 'Int'>
    readonly createdAt: FieldRef<"StorageFile", 'DateTime'>
    readonly updatedAt: FieldRef<"StorageFile", 'DateTime'>
    readonly entry: FieldRef<"StorageFile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StorageFile findUnique
   */
  export type StorageFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
    /**
     * Filter, which StorageFile to fetch.
     */
    where: StorageFileWhereUniqueInput
  }

  /**
   * StorageFile findUniqueOrThrow
   */
  export type StorageFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
    /**
     * Filter, which StorageFile to fetch.
     */
    where: StorageFileWhereUniqueInput
  }

  /**
   * StorageFile findFirst
   */
  export type StorageFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
    /**
     * Filter, which StorageFile to fetch.
     */
    where?: StorageFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorageFiles to fetch.
     */
    orderBy?: StorageFileOrderByWithRelationInput | StorageFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorageFiles.
     */
    cursor?: StorageFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorageFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorageFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorageFiles.
     */
    distinct?: StorageFileScalarFieldEnum | StorageFileScalarFieldEnum[]
  }

  /**
   * StorageFile findFirstOrThrow
   */
  export type StorageFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
    /**
     * Filter, which StorageFile to fetch.
     */
    where?: StorageFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorageFiles to fetch.
     */
    orderBy?: StorageFileOrderByWithRelationInput | StorageFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorageFiles.
     */
    cursor?: StorageFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorageFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorageFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorageFiles.
     */
    distinct?: StorageFileScalarFieldEnum | StorageFileScalarFieldEnum[]
  }

  /**
   * StorageFile findMany
   */
  export type StorageFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
    /**
     * Filter, which StorageFiles to fetch.
     */
    where?: StorageFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorageFiles to fetch.
     */
    orderBy?: StorageFileOrderByWithRelationInput | StorageFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StorageFiles.
     */
    cursor?: StorageFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorageFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorageFiles.
     */
    skip?: number
    distinct?: StorageFileScalarFieldEnum | StorageFileScalarFieldEnum[]
  }

  /**
   * StorageFile create
   */
  export type StorageFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
    /**
     * The data needed to create a StorageFile.
     */
    data: XOR<StorageFileCreateInput, StorageFileUncheckedCreateInput>
  }

  /**
   * StorageFile createMany
   */
  export type StorageFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StorageFiles.
     */
    data: StorageFileCreateManyInput | StorageFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StorageFile createManyAndReturn
   */
  export type StorageFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
    /**
     * The data used to create many StorageFiles.
     */
    data: StorageFileCreateManyInput | StorageFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StorageFile update
   */
  export type StorageFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
    /**
     * The data needed to update a StorageFile.
     */
    data: XOR<StorageFileUpdateInput, StorageFileUncheckedUpdateInput>
    /**
     * Choose, which StorageFile to update.
     */
    where: StorageFileWhereUniqueInput
  }

  /**
   * StorageFile updateMany
   */
  export type StorageFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StorageFiles.
     */
    data: XOR<StorageFileUpdateManyMutationInput, StorageFileUncheckedUpdateManyInput>
    /**
     * Filter which StorageFiles to update
     */
    where?: StorageFileWhereInput
    /**
     * Limit how many StorageFiles to update.
     */
    limit?: number
  }

  /**
   * StorageFile updateManyAndReturn
   */
  export type StorageFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
    /**
     * The data used to update StorageFiles.
     */
    data: XOR<StorageFileUpdateManyMutationInput, StorageFileUncheckedUpdateManyInput>
    /**
     * Filter which StorageFiles to update
     */
    where?: StorageFileWhereInput
    /**
     * Limit how many StorageFiles to update.
     */
    limit?: number
  }

  /**
   * StorageFile upsert
   */
  export type StorageFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
    /**
     * The filter to search for the StorageFile to update in case it exists.
     */
    where: StorageFileWhereUniqueInput
    /**
     * In case the StorageFile found by the `where` argument doesn't exist, create a new StorageFile with this data.
     */
    create: XOR<StorageFileCreateInput, StorageFileUncheckedCreateInput>
    /**
     * In case the StorageFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StorageFileUpdateInput, StorageFileUncheckedUpdateInput>
  }

  /**
   * StorageFile delete
   */
  export type StorageFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
    /**
     * Filter which StorageFile to delete.
     */
    where: StorageFileWhereUniqueInput
  }

  /**
   * StorageFile deleteMany
   */
  export type StorageFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorageFiles to delete
     */
    where?: StorageFileWhereInput
    /**
     * Limit how many StorageFiles to delete.
     */
    limit?: number
  }

  /**
   * StorageFile without action
   */
  export type StorageFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageFile
     */
    select?: StorageFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageFile
     */
    omit?: StorageFileOmit<ExtArgs> | null
  }


  /**
   * Model AIGeneration
   */

  export type AggregateAIGeneration = {
    _count: AIGenerationCountAggregateOutputType | null
    _avg: AIGenerationAvgAggregateOutputType | null
    _sum: AIGenerationSumAggregateOutputType | null
    _min: AIGenerationMinAggregateOutputType | null
    _max: AIGenerationMaxAggregateOutputType | null
  }

  export type AIGenerationAvgAggregateOutputType = {
    tokens: number | null
    cost: number | null
    latency: number | null
  }

  export type AIGenerationSumAggregateOutputType = {
    tokens: number | null
    cost: number | null
    latency: number | null
  }

  export type AIGenerationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    prompt: string | null
    model: string | null
    tokens: number | null
    cost: number | null
    latency: number | null
    status: $Enums.GenerationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIGenerationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    prompt: string | null
    model: string | null
    tokens: number | null
    cost: number | null
    latency: number | null
    status: $Enums.GenerationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIGenerationCountAggregateOutputType = {
    id: number
    userId: number
    prompt: number
    model: number
    response: number
    tokens: number
    cost: number
    latency: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIGenerationAvgAggregateInputType = {
    tokens?: true
    cost?: true
    latency?: true
  }

  export type AIGenerationSumAggregateInputType = {
    tokens?: true
    cost?: true
    latency?: true
  }

  export type AIGenerationMinAggregateInputType = {
    id?: true
    userId?: true
    prompt?: true
    model?: true
    tokens?: true
    cost?: true
    latency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIGenerationMaxAggregateInputType = {
    id?: true
    userId?: true
    prompt?: true
    model?: true
    tokens?: true
    cost?: true
    latency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIGenerationCountAggregateInputType = {
    id?: true
    userId?: true
    prompt?: true
    model?: true
    response?: true
    tokens?: true
    cost?: true
    latency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIGenerationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIGeneration to aggregate.
     */
    where?: AIGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGenerations to fetch.
     */
    orderBy?: AIGenerationOrderByWithRelationInput | AIGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIGenerations
    **/
    _count?: true | AIGenerationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIGenerationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIGenerationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIGenerationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIGenerationMaxAggregateInputType
  }

  export type GetAIGenerationAggregateType<T extends AIGenerationAggregateArgs> = {
        [P in keyof T & keyof AggregateAIGeneration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIGeneration[P]>
      : GetScalarType<T[P], AggregateAIGeneration[P]>
  }




  export type AIGenerationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIGenerationWhereInput
    orderBy?: AIGenerationOrderByWithAggregationInput | AIGenerationOrderByWithAggregationInput[]
    by: AIGenerationScalarFieldEnum[] | AIGenerationScalarFieldEnum
    having?: AIGenerationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIGenerationCountAggregateInputType | true
    _avg?: AIGenerationAvgAggregateInputType
    _sum?: AIGenerationSumAggregateInputType
    _min?: AIGenerationMinAggregateInputType
    _max?: AIGenerationMaxAggregateInputType
  }

  export type AIGenerationGroupByOutputType = {
    id: string
    userId: string | null
    prompt: string
    model: string
    response: JsonValue
    tokens: number
    cost: number
    latency: number
    status: $Enums.GenerationStatus
    createdAt: Date
    updatedAt: Date
    _count: AIGenerationCountAggregateOutputType | null
    _avg: AIGenerationAvgAggregateOutputType | null
    _sum: AIGenerationSumAggregateOutputType | null
    _min: AIGenerationMinAggregateOutputType | null
    _max: AIGenerationMaxAggregateOutputType | null
  }

  type GetAIGenerationGroupByPayload<T extends AIGenerationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIGenerationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIGenerationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIGenerationGroupByOutputType[P]>
            : GetScalarType<T[P], AIGenerationGroupByOutputType[P]>
        }
      >
    >


  export type AIGenerationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    prompt?: boolean
    model?: boolean
    response?: boolean
    tokens?: boolean
    cost?: boolean
    latency?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIGeneration"]>

  export type AIGenerationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    prompt?: boolean
    model?: boolean
    response?: boolean
    tokens?: boolean
    cost?: boolean
    latency?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIGeneration"]>

  export type AIGenerationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    prompt?: boolean
    model?: boolean
    response?: boolean
    tokens?: boolean
    cost?: boolean
    latency?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIGeneration"]>

  export type AIGenerationSelectScalar = {
    id?: boolean
    userId?: boolean
    prompt?: boolean
    model?: boolean
    response?: boolean
    tokens?: boolean
    cost?: boolean
    latency?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIGenerationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "prompt" | "model" | "response" | "tokens" | "cost" | "latency" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["aIGeneration"]>

  export type $AIGenerationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIGeneration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      prompt: string
      model: string
      response: Prisma.JsonValue
      tokens: number
      cost: number
      latency: number
      status: $Enums.GenerationStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIGeneration"]>
    composites: {}
  }

  type AIGenerationGetPayload<S extends boolean | null | undefined | AIGenerationDefaultArgs> = $Result.GetResult<Prisma.$AIGenerationPayload, S>

  type AIGenerationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIGenerationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIGenerationCountAggregateInputType | true
    }

  export interface AIGenerationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIGeneration'], meta: { name: 'AIGeneration' } }
    /**
     * Find zero or one AIGeneration that matches the filter.
     * @param {AIGenerationFindUniqueArgs} args - Arguments to find a AIGeneration
     * @example
     * // Get one AIGeneration
     * const aIGeneration = await prisma.aIGeneration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIGenerationFindUniqueArgs>(args: SelectSubset<T, AIGenerationFindUniqueArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIGeneration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIGenerationFindUniqueOrThrowArgs} args - Arguments to find a AIGeneration
     * @example
     * // Get one AIGeneration
     * const aIGeneration = await prisma.aIGeneration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIGenerationFindUniqueOrThrowArgs>(args: SelectSubset<T, AIGenerationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIGeneration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationFindFirstArgs} args - Arguments to find a AIGeneration
     * @example
     * // Get one AIGeneration
     * const aIGeneration = await prisma.aIGeneration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIGenerationFindFirstArgs>(args?: SelectSubset<T, AIGenerationFindFirstArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIGeneration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationFindFirstOrThrowArgs} args - Arguments to find a AIGeneration
     * @example
     * // Get one AIGeneration
     * const aIGeneration = await prisma.aIGeneration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIGenerationFindFirstOrThrowArgs>(args?: SelectSubset<T, AIGenerationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIGenerations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIGenerations
     * const aIGenerations = await prisma.aIGeneration.findMany()
     * 
     * // Get first 10 AIGenerations
     * const aIGenerations = await prisma.aIGeneration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIGenerationWithIdOnly = await prisma.aIGeneration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIGenerationFindManyArgs>(args?: SelectSubset<T, AIGenerationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIGeneration.
     * @param {AIGenerationCreateArgs} args - Arguments to create a AIGeneration.
     * @example
     * // Create one AIGeneration
     * const AIGeneration = await prisma.aIGeneration.create({
     *   data: {
     *     // ... data to create a AIGeneration
     *   }
     * })
     * 
     */
    create<T extends AIGenerationCreateArgs>(args: SelectSubset<T, AIGenerationCreateArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIGenerations.
     * @param {AIGenerationCreateManyArgs} args - Arguments to create many AIGenerations.
     * @example
     * // Create many AIGenerations
     * const aIGeneration = await prisma.aIGeneration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIGenerationCreateManyArgs>(args?: SelectSubset<T, AIGenerationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIGenerations and returns the data saved in the database.
     * @param {AIGenerationCreateManyAndReturnArgs} args - Arguments to create many AIGenerations.
     * @example
     * // Create many AIGenerations
     * const aIGeneration = await prisma.aIGeneration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIGenerations and only return the `id`
     * const aIGenerationWithIdOnly = await prisma.aIGeneration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIGenerationCreateManyAndReturnArgs>(args?: SelectSubset<T, AIGenerationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIGeneration.
     * @param {AIGenerationDeleteArgs} args - Arguments to delete one AIGeneration.
     * @example
     * // Delete one AIGeneration
     * const AIGeneration = await prisma.aIGeneration.delete({
     *   where: {
     *     // ... filter to delete one AIGeneration
     *   }
     * })
     * 
     */
    delete<T extends AIGenerationDeleteArgs>(args: SelectSubset<T, AIGenerationDeleteArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIGeneration.
     * @param {AIGenerationUpdateArgs} args - Arguments to update one AIGeneration.
     * @example
     * // Update one AIGeneration
     * const aIGeneration = await prisma.aIGeneration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIGenerationUpdateArgs>(args: SelectSubset<T, AIGenerationUpdateArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIGenerations.
     * @param {AIGenerationDeleteManyArgs} args - Arguments to filter AIGenerations to delete.
     * @example
     * // Delete a few AIGenerations
     * const { count } = await prisma.aIGeneration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIGenerationDeleteManyArgs>(args?: SelectSubset<T, AIGenerationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIGenerations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIGenerations
     * const aIGeneration = await prisma.aIGeneration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIGenerationUpdateManyArgs>(args: SelectSubset<T, AIGenerationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIGenerations and returns the data updated in the database.
     * @param {AIGenerationUpdateManyAndReturnArgs} args - Arguments to update many AIGenerations.
     * @example
     * // Update many AIGenerations
     * const aIGeneration = await prisma.aIGeneration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIGenerations and only return the `id`
     * const aIGenerationWithIdOnly = await prisma.aIGeneration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AIGenerationUpdateManyAndReturnArgs>(args: SelectSubset<T, AIGenerationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIGeneration.
     * @param {AIGenerationUpsertArgs} args - Arguments to update or create a AIGeneration.
     * @example
     * // Update or create a AIGeneration
     * const aIGeneration = await prisma.aIGeneration.upsert({
     *   create: {
     *     // ... data to create a AIGeneration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIGeneration we want to update
     *   }
     * })
     */
    upsert<T extends AIGenerationUpsertArgs>(args: SelectSubset<T, AIGenerationUpsertArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIGenerations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationCountArgs} args - Arguments to filter AIGenerations to count.
     * @example
     * // Count the number of AIGenerations
     * const count = await prisma.aIGeneration.count({
     *   where: {
     *     // ... the filter for the AIGenerations we want to count
     *   }
     * })
    **/
    count<T extends AIGenerationCountArgs>(
      args?: Subset<T, AIGenerationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIGenerationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIGeneration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIGenerationAggregateArgs>(args: Subset<T, AIGenerationAggregateArgs>): Prisma.PrismaPromise<GetAIGenerationAggregateType<T>>

    /**
     * Group by AIGeneration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIGenerationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIGenerationGroupByArgs['orderBy'] }
        : { orderBy?: AIGenerationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIGenerationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIGenerationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIGeneration model
   */
  readonly fields: AIGenerationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIGeneration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIGenerationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AIGeneration model
   */
  interface AIGenerationFieldRefs {
    readonly id: FieldRef<"AIGeneration", 'String'>
    readonly userId: FieldRef<"AIGeneration", 'String'>
    readonly prompt: FieldRef<"AIGeneration", 'String'>
    readonly model: FieldRef<"AIGeneration", 'String'>
    readonly response: FieldRef<"AIGeneration", 'Json'>
    readonly tokens: FieldRef<"AIGeneration", 'Int'>
    readonly cost: FieldRef<"AIGeneration", 'Float'>
    readonly latency: FieldRef<"AIGeneration", 'Int'>
    readonly status: FieldRef<"AIGeneration", 'GenerationStatus'>
    readonly createdAt: FieldRef<"AIGeneration", 'DateTime'>
    readonly updatedAt: FieldRef<"AIGeneration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIGeneration findUnique
   */
  export type AIGenerationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Filter, which AIGeneration to fetch.
     */
    where: AIGenerationWhereUniqueInput
  }

  /**
   * AIGeneration findUniqueOrThrow
   */
  export type AIGenerationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Filter, which AIGeneration to fetch.
     */
    where: AIGenerationWhereUniqueInput
  }

  /**
   * AIGeneration findFirst
   */
  export type AIGenerationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Filter, which AIGeneration to fetch.
     */
    where?: AIGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGenerations to fetch.
     */
    orderBy?: AIGenerationOrderByWithRelationInput | AIGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIGenerations.
     */
    cursor?: AIGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIGenerations.
     */
    distinct?: AIGenerationScalarFieldEnum | AIGenerationScalarFieldEnum[]
  }

  /**
   * AIGeneration findFirstOrThrow
   */
  export type AIGenerationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Filter, which AIGeneration to fetch.
     */
    where?: AIGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGenerations to fetch.
     */
    orderBy?: AIGenerationOrderByWithRelationInput | AIGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIGenerations.
     */
    cursor?: AIGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIGenerations.
     */
    distinct?: AIGenerationScalarFieldEnum | AIGenerationScalarFieldEnum[]
  }

  /**
   * AIGeneration findMany
   */
  export type AIGenerationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Filter, which AIGenerations to fetch.
     */
    where?: AIGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGenerations to fetch.
     */
    orderBy?: AIGenerationOrderByWithRelationInput | AIGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIGenerations.
     */
    cursor?: AIGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGenerations.
     */
    skip?: number
    distinct?: AIGenerationScalarFieldEnum | AIGenerationScalarFieldEnum[]
  }

  /**
   * AIGeneration create
   */
  export type AIGenerationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * The data needed to create a AIGeneration.
     */
    data: XOR<AIGenerationCreateInput, AIGenerationUncheckedCreateInput>
  }

  /**
   * AIGeneration createMany
   */
  export type AIGenerationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIGenerations.
     */
    data: AIGenerationCreateManyInput | AIGenerationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIGeneration createManyAndReturn
   */
  export type AIGenerationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * The data used to create many AIGenerations.
     */
    data: AIGenerationCreateManyInput | AIGenerationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIGeneration update
   */
  export type AIGenerationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * The data needed to update a AIGeneration.
     */
    data: XOR<AIGenerationUpdateInput, AIGenerationUncheckedUpdateInput>
    /**
     * Choose, which AIGeneration to update.
     */
    where: AIGenerationWhereUniqueInput
  }

  /**
   * AIGeneration updateMany
   */
  export type AIGenerationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIGenerations.
     */
    data: XOR<AIGenerationUpdateManyMutationInput, AIGenerationUncheckedUpdateManyInput>
    /**
     * Filter which AIGenerations to update
     */
    where?: AIGenerationWhereInput
    /**
     * Limit how many AIGenerations to update.
     */
    limit?: number
  }

  /**
   * AIGeneration updateManyAndReturn
   */
  export type AIGenerationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * The data used to update AIGenerations.
     */
    data: XOR<AIGenerationUpdateManyMutationInput, AIGenerationUncheckedUpdateManyInput>
    /**
     * Filter which AIGenerations to update
     */
    where?: AIGenerationWhereInput
    /**
     * Limit how many AIGenerations to update.
     */
    limit?: number
  }

  /**
   * AIGeneration upsert
   */
  export type AIGenerationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * The filter to search for the AIGeneration to update in case it exists.
     */
    where: AIGenerationWhereUniqueInput
    /**
     * In case the AIGeneration found by the `where` argument doesn't exist, create a new AIGeneration with this data.
     */
    create: XOR<AIGenerationCreateInput, AIGenerationUncheckedCreateInput>
    /**
     * In case the AIGeneration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIGenerationUpdateInput, AIGenerationUncheckedUpdateInput>
  }

  /**
   * AIGeneration delete
   */
  export type AIGenerationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Filter which AIGeneration to delete.
     */
    where: AIGenerationWhereUniqueInput
  }

  /**
   * AIGeneration deleteMany
   */
  export type AIGenerationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIGenerations to delete
     */
    where?: AIGenerationWhereInput
    /**
     * Limit how many AIGenerations to delete.
     */
    limit?: number
  }

  /**
   * AIGeneration without action
   */
  export type AIGenerationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
  }


  /**
   * Model QueueJob
   */

  export type AggregateQueueJob = {
    _count: QueueJobCountAggregateOutputType | null
    _avg: QueueJobAvgAggregateOutputType | null
    _sum: QueueJobSumAggregateOutputType | null
    _min: QueueJobMinAggregateOutputType | null
    _max: QueueJobMaxAggregateOutputType | null
  }

  export type QueueJobAvgAggregateOutputType = {
    attempts: number | null
    maxAttempts: number | null
  }

  export type QueueJobSumAggregateOutputType = {
    attempts: number | null
    maxAttempts: number | null
  }

  export type QueueJobMinAggregateOutputType = {
    id: string | null
    type: $Enums.JobType | null
    priority: $Enums.JobPriority | null
    status: $Enums.JobStatus | null
    attempts: number | null
    maxAttempts: number | null
    scheduledAt: Date | null
    startedAt: Date | null
    completedAt: Date | null
    failedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QueueJobMaxAggregateOutputType = {
    id: string | null
    type: $Enums.JobType | null
    priority: $Enums.JobPriority | null
    status: $Enums.JobStatus | null
    attempts: number | null
    maxAttempts: number | null
    scheduledAt: Date | null
    startedAt: Date | null
    completedAt: Date | null
    failedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QueueJobCountAggregateOutputType = {
    id: number
    type: number
    data: number
    priority: number
    status: number
    attempts: number
    maxAttempts: number
    scheduledAt: number
    startedAt: number
    completedAt: number
    failedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QueueJobAvgAggregateInputType = {
    attempts?: true
    maxAttempts?: true
  }

  export type QueueJobSumAggregateInputType = {
    attempts?: true
    maxAttempts?: true
  }

  export type QueueJobMinAggregateInputType = {
    id?: true
    type?: true
    priority?: true
    status?: true
    attempts?: true
    maxAttempts?: true
    scheduledAt?: true
    startedAt?: true
    completedAt?: true
    failedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QueueJobMaxAggregateInputType = {
    id?: true
    type?: true
    priority?: true
    status?: true
    attempts?: true
    maxAttempts?: true
    scheduledAt?: true
    startedAt?: true
    completedAt?: true
    failedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QueueJobCountAggregateInputType = {
    id?: true
    type?: true
    data?: true
    priority?: true
    status?: true
    attempts?: true
    maxAttempts?: true
    scheduledAt?: true
    startedAt?: true
    completedAt?: true
    failedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QueueJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueJob to aggregate.
     */
    where?: QueueJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueJobs to fetch.
     */
    orderBy?: QueueJobOrderByWithRelationInput | QueueJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QueueJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QueueJobs
    **/
    _count?: true | QueueJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QueueJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QueueJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QueueJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QueueJobMaxAggregateInputType
  }

  export type GetQueueJobAggregateType<T extends QueueJobAggregateArgs> = {
        [P in keyof T & keyof AggregateQueueJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQueueJob[P]>
      : GetScalarType<T[P], AggregateQueueJob[P]>
  }




  export type QueueJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueJobWhereInput
    orderBy?: QueueJobOrderByWithAggregationInput | QueueJobOrderByWithAggregationInput[]
    by: QueueJobScalarFieldEnum[] | QueueJobScalarFieldEnum
    having?: QueueJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QueueJobCountAggregateInputType | true
    _avg?: QueueJobAvgAggregateInputType
    _sum?: QueueJobSumAggregateInputType
    _min?: QueueJobMinAggregateInputType
    _max?: QueueJobMaxAggregateInputType
  }

  export type QueueJobGroupByOutputType = {
    id: string
    type: $Enums.JobType
    data: JsonValue
    priority: $Enums.JobPriority
    status: $Enums.JobStatus
    attempts: number
    maxAttempts: number
    scheduledAt: Date
    startedAt: Date | null
    completedAt: Date | null
    failedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: QueueJobCountAggregateOutputType | null
    _avg: QueueJobAvgAggregateOutputType | null
    _sum: QueueJobSumAggregateOutputType | null
    _min: QueueJobMinAggregateOutputType | null
    _max: QueueJobMaxAggregateOutputType | null
  }

  type GetQueueJobGroupByPayload<T extends QueueJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QueueJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QueueJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QueueJobGroupByOutputType[P]>
            : GetScalarType<T[P], QueueJobGroupByOutputType[P]>
        }
      >
    >


  export type QueueJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    data?: boolean
    priority?: boolean
    status?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    completedAt?: boolean
    failedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["queueJob"]>

  export type QueueJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    data?: boolean
    priority?: boolean
    status?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    completedAt?: boolean
    failedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["queueJob"]>

  export type QueueJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    data?: boolean
    priority?: boolean
    status?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    completedAt?: boolean
    failedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["queueJob"]>

  export type QueueJobSelectScalar = {
    id?: boolean
    type?: boolean
    data?: boolean
    priority?: boolean
    status?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    completedAt?: boolean
    failedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QueueJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "data" | "priority" | "status" | "attempts" | "maxAttempts" | "scheduledAt" | "startedAt" | "completedAt" | "failedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["queueJob"]>

  export type $QueueJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QueueJob"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.JobType
      data: Prisma.JsonValue
      priority: $Enums.JobPriority
      status: $Enums.JobStatus
      attempts: number
      maxAttempts: number
      scheduledAt: Date
      startedAt: Date | null
      completedAt: Date | null
      failedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["queueJob"]>
    composites: {}
  }

  type QueueJobGetPayload<S extends boolean | null | undefined | QueueJobDefaultArgs> = $Result.GetResult<Prisma.$QueueJobPayload, S>

  type QueueJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QueueJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QueueJobCountAggregateInputType | true
    }

  export interface QueueJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QueueJob'], meta: { name: 'QueueJob' } }
    /**
     * Find zero or one QueueJob that matches the filter.
     * @param {QueueJobFindUniqueArgs} args - Arguments to find a QueueJob
     * @example
     * // Get one QueueJob
     * const queueJob = await prisma.queueJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QueueJobFindUniqueArgs>(args: SelectSubset<T, QueueJobFindUniqueArgs<ExtArgs>>): Prisma__QueueJobClient<$Result.GetResult<Prisma.$QueueJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QueueJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QueueJobFindUniqueOrThrowArgs} args - Arguments to find a QueueJob
     * @example
     * // Get one QueueJob
     * const queueJob = await prisma.queueJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QueueJobFindUniqueOrThrowArgs>(args: SelectSubset<T, QueueJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QueueJobClient<$Result.GetResult<Prisma.$QueueJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueJobFindFirstArgs} args - Arguments to find a QueueJob
     * @example
     * // Get one QueueJob
     * const queueJob = await prisma.queueJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QueueJobFindFirstArgs>(args?: SelectSubset<T, QueueJobFindFirstArgs<ExtArgs>>): Prisma__QueueJobClient<$Result.GetResult<Prisma.$QueueJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueJobFindFirstOrThrowArgs} args - Arguments to find a QueueJob
     * @example
     * // Get one QueueJob
     * const queueJob = await prisma.queueJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QueueJobFindFirstOrThrowArgs>(args?: SelectSubset<T, QueueJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__QueueJobClient<$Result.GetResult<Prisma.$QueueJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QueueJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QueueJobs
     * const queueJobs = await prisma.queueJob.findMany()
     * 
     * // Get first 10 QueueJobs
     * const queueJobs = await prisma.queueJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const queueJobWithIdOnly = await prisma.queueJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QueueJobFindManyArgs>(args?: SelectSubset<T, QueueJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QueueJob.
     * @param {QueueJobCreateArgs} args - Arguments to create a QueueJob.
     * @example
     * // Create one QueueJob
     * const QueueJob = await prisma.queueJob.create({
     *   data: {
     *     // ... data to create a QueueJob
     *   }
     * })
     * 
     */
    create<T extends QueueJobCreateArgs>(args: SelectSubset<T, QueueJobCreateArgs<ExtArgs>>): Prisma__QueueJobClient<$Result.GetResult<Prisma.$QueueJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QueueJobs.
     * @param {QueueJobCreateManyArgs} args - Arguments to create many QueueJobs.
     * @example
     * // Create many QueueJobs
     * const queueJob = await prisma.queueJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QueueJobCreateManyArgs>(args?: SelectSubset<T, QueueJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QueueJobs and returns the data saved in the database.
     * @param {QueueJobCreateManyAndReturnArgs} args - Arguments to create many QueueJobs.
     * @example
     * // Create many QueueJobs
     * const queueJob = await prisma.queueJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QueueJobs and only return the `id`
     * const queueJobWithIdOnly = await prisma.queueJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QueueJobCreateManyAndReturnArgs>(args?: SelectSubset<T, QueueJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QueueJob.
     * @param {QueueJobDeleteArgs} args - Arguments to delete one QueueJob.
     * @example
     * // Delete one QueueJob
     * const QueueJob = await prisma.queueJob.delete({
     *   where: {
     *     // ... filter to delete one QueueJob
     *   }
     * })
     * 
     */
    delete<T extends QueueJobDeleteArgs>(args: SelectSubset<T, QueueJobDeleteArgs<ExtArgs>>): Prisma__QueueJobClient<$Result.GetResult<Prisma.$QueueJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QueueJob.
     * @param {QueueJobUpdateArgs} args - Arguments to update one QueueJob.
     * @example
     * // Update one QueueJob
     * const queueJob = await prisma.queueJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QueueJobUpdateArgs>(args: SelectSubset<T, QueueJobUpdateArgs<ExtArgs>>): Prisma__QueueJobClient<$Result.GetResult<Prisma.$QueueJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QueueJobs.
     * @param {QueueJobDeleteManyArgs} args - Arguments to filter QueueJobs to delete.
     * @example
     * // Delete a few QueueJobs
     * const { count } = await prisma.queueJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QueueJobDeleteManyArgs>(args?: SelectSubset<T, QueueJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QueueJobs
     * const queueJob = await prisma.queueJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QueueJobUpdateManyArgs>(args: SelectSubset<T, QueueJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueJobs and returns the data updated in the database.
     * @param {QueueJobUpdateManyAndReturnArgs} args - Arguments to update many QueueJobs.
     * @example
     * // Update many QueueJobs
     * const queueJob = await prisma.queueJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QueueJobs and only return the `id`
     * const queueJobWithIdOnly = await prisma.queueJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QueueJobUpdateManyAndReturnArgs>(args: SelectSubset<T, QueueJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QueueJob.
     * @param {QueueJobUpsertArgs} args - Arguments to update or create a QueueJob.
     * @example
     * // Update or create a QueueJob
     * const queueJob = await prisma.queueJob.upsert({
     *   create: {
     *     // ... data to create a QueueJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QueueJob we want to update
     *   }
     * })
     */
    upsert<T extends QueueJobUpsertArgs>(args: SelectSubset<T, QueueJobUpsertArgs<ExtArgs>>): Prisma__QueueJobClient<$Result.GetResult<Prisma.$QueueJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QueueJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueJobCountArgs} args - Arguments to filter QueueJobs to count.
     * @example
     * // Count the number of QueueJobs
     * const count = await prisma.queueJob.count({
     *   where: {
     *     // ... the filter for the QueueJobs we want to count
     *   }
     * })
    **/
    count<T extends QueueJobCountArgs>(
      args?: Subset<T, QueueJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QueueJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QueueJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QueueJobAggregateArgs>(args: Subset<T, QueueJobAggregateArgs>): Prisma.PrismaPromise<GetQueueJobAggregateType<T>>

    /**
     * Group by QueueJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QueueJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QueueJobGroupByArgs['orderBy'] }
        : { orderBy?: QueueJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QueueJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueueJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QueueJob model
   */
  readonly fields: QueueJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QueueJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QueueJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QueueJob model
   */
  interface QueueJobFieldRefs {
    readonly id: FieldRef<"QueueJob", 'String'>
    readonly type: FieldRef<"QueueJob", 'JobType'>
    readonly data: FieldRef<"QueueJob", 'Json'>
    readonly priority: FieldRef<"QueueJob", 'JobPriority'>
    readonly status: FieldRef<"QueueJob", 'JobStatus'>
    readonly attempts: FieldRef<"QueueJob", 'Int'>
    readonly maxAttempts: FieldRef<"QueueJob", 'Int'>
    readonly scheduledAt: FieldRef<"QueueJob", 'DateTime'>
    readonly startedAt: FieldRef<"QueueJob", 'DateTime'>
    readonly completedAt: FieldRef<"QueueJob", 'DateTime'>
    readonly failedAt: FieldRef<"QueueJob", 'DateTime'>
    readonly createdAt: FieldRef<"QueueJob", 'DateTime'>
    readonly updatedAt: FieldRef<"QueueJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QueueJob findUnique
   */
  export type QueueJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
    /**
     * Filter, which QueueJob to fetch.
     */
    where: QueueJobWhereUniqueInput
  }

  /**
   * QueueJob findUniqueOrThrow
   */
  export type QueueJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
    /**
     * Filter, which QueueJob to fetch.
     */
    where: QueueJobWhereUniqueInput
  }

  /**
   * QueueJob findFirst
   */
  export type QueueJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
    /**
     * Filter, which QueueJob to fetch.
     */
    where?: QueueJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueJobs to fetch.
     */
    orderBy?: QueueJobOrderByWithRelationInput | QueueJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueJobs.
     */
    cursor?: QueueJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueJobs.
     */
    distinct?: QueueJobScalarFieldEnum | QueueJobScalarFieldEnum[]
  }

  /**
   * QueueJob findFirstOrThrow
   */
  export type QueueJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
    /**
     * Filter, which QueueJob to fetch.
     */
    where?: QueueJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueJobs to fetch.
     */
    orderBy?: QueueJobOrderByWithRelationInput | QueueJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueJobs.
     */
    cursor?: QueueJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueJobs.
     */
    distinct?: QueueJobScalarFieldEnum | QueueJobScalarFieldEnum[]
  }

  /**
   * QueueJob findMany
   */
  export type QueueJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
    /**
     * Filter, which QueueJobs to fetch.
     */
    where?: QueueJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueJobs to fetch.
     */
    orderBy?: QueueJobOrderByWithRelationInput | QueueJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QueueJobs.
     */
    cursor?: QueueJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueJobs.
     */
    skip?: number
    distinct?: QueueJobScalarFieldEnum | QueueJobScalarFieldEnum[]
  }

  /**
   * QueueJob create
   */
  export type QueueJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
    /**
     * The data needed to create a QueueJob.
     */
    data: XOR<QueueJobCreateInput, QueueJobUncheckedCreateInput>
  }

  /**
   * QueueJob createMany
   */
  export type QueueJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QueueJobs.
     */
    data: QueueJobCreateManyInput | QueueJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueueJob createManyAndReturn
   */
  export type QueueJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
    /**
     * The data used to create many QueueJobs.
     */
    data: QueueJobCreateManyInput | QueueJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueueJob update
   */
  export type QueueJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
    /**
     * The data needed to update a QueueJob.
     */
    data: XOR<QueueJobUpdateInput, QueueJobUncheckedUpdateInput>
    /**
     * Choose, which QueueJob to update.
     */
    where: QueueJobWhereUniqueInput
  }

  /**
   * QueueJob updateMany
   */
  export type QueueJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QueueJobs.
     */
    data: XOR<QueueJobUpdateManyMutationInput, QueueJobUncheckedUpdateManyInput>
    /**
     * Filter which QueueJobs to update
     */
    where?: QueueJobWhereInput
    /**
     * Limit how many QueueJobs to update.
     */
    limit?: number
  }

  /**
   * QueueJob updateManyAndReturn
   */
  export type QueueJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
    /**
     * The data used to update QueueJobs.
     */
    data: XOR<QueueJobUpdateManyMutationInput, QueueJobUncheckedUpdateManyInput>
    /**
     * Filter which QueueJobs to update
     */
    where?: QueueJobWhereInput
    /**
     * Limit how many QueueJobs to update.
     */
    limit?: number
  }

  /**
   * QueueJob upsert
   */
  export type QueueJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
    /**
     * The filter to search for the QueueJob to update in case it exists.
     */
    where: QueueJobWhereUniqueInput
    /**
     * In case the QueueJob found by the `where` argument doesn't exist, create a new QueueJob with this data.
     */
    create: XOR<QueueJobCreateInput, QueueJobUncheckedCreateInput>
    /**
     * In case the QueueJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QueueJobUpdateInput, QueueJobUncheckedUpdateInput>
  }

  /**
   * QueueJob delete
   */
  export type QueueJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
    /**
     * Filter which QueueJob to delete.
     */
    where: QueueJobWhereUniqueInput
  }

  /**
   * QueueJob deleteMany
   */
  export type QueueJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueJobs to delete
     */
    where?: QueueJobWhereInput
    /**
     * Limit how many QueueJobs to delete.
     */
    limit?: number
  }

  /**
   * QueueJob without action
   */
  export type QueueJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueJob
     */
    select?: QueueJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueJob
     */
    omit?: QueueJobOmit<ExtArgs> | null
  }


  /**
   * Model SearchIndex
   */

  export type AggregateSearchIndex = {
    _count: SearchIndexCountAggregateOutputType | null
    _avg: SearchIndexAvgAggregateOutputType | null
    _sum: SearchIndexSumAggregateOutputType | null
    _min: SearchIndexMinAggregateOutputType | null
    _max: SearchIndexMaxAggregateOutputType | null
  }

  export type SearchIndexAvgAggregateOutputType = {
    weight: number | null
  }

  export type SearchIndexSumAggregateOutputType = {
    weight: number | null
  }

  export type SearchIndexMinAggregateOutputType = {
    id: string | null
    entityType: string | null
    entityId: string | null
    weight: number | null
    indexedAt: Date | null
    updatedAt: Date | null
  }

  export type SearchIndexMaxAggregateOutputType = {
    id: string | null
    entityType: string | null
    entityId: string | null
    weight: number | null
    indexedAt: Date | null
    updatedAt: Date | null
  }

  export type SearchIndexCountAggregateOutputType = {
    id: number
    entityType: number
    entityId: number
    content: number
    keywords: number
    weight: number
    indexedAt: number
    updatedAt: number
    _all: number
  }


  export type SearchIndexAvgAggregateInputType = {
    weight?: true
  }

  export type SearchIndexSumAggregateInputType = {
    weight?: true
  }

  export type SearchIndexMinAggregateInputType = {
    id?: true
    entityType?: true
    entityId?: true
    weight?: true
    indexedAt?: true
    updatedAt?: true
  }

  export type SearchIndexMaxAggregateInputType = {
    id?: true
    entityType?: true
    entityId?: true
    weight?: true
    indexedAt?: true
    updatedAt?: true
  }

  export type SearchIndexCountAggregateInputType = {
    id?: true
    entityType?: true
    entityId?: true
    content?: true
    keywords?: true
    weight?: true
    indexedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SearchIndexAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchIndex to aggregate.
     */
    where?: SearchIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchIndices to fetch.
     */
    orderBy?: SearchIndexOrderByWithRelationInput | SearchIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SearchIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchIndices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SearchIndices
    **/
    _count?: true | SearchIndexCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SearchIndexAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SearchIndexSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SearchIndexMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SearchIndexMaxAggregateInputType
  }

  export type GetSearchIndexAggregateType<T extends SearchIndexAggregateArgs> = {
        [P in keyof T & keyof AggregateSearchIndex]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSearchIndex[P]>
      : GetScalarType<T[P], AggregateSearchIndex[P]>
  }




  export type SearchIndexGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchIndexWhereInput
    orderBy?: SearchIndexOrderByWithAggregationInput | SearchIndexOrderByWithAggregationInput[]
    by: SearchIndexScalarFieldEnum[] | SearchIndexScalarFieldEnum
    having?: SearchIndexScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SearchIndexCountAggregateInputType | true
    _avg?: SearchIndexAvgAggregateInputType
    _sum?: SearchIndexSumAggregateInputType
    _min?: SearchIndexMinAggregateInputType
    _max?: SearchIndexMaxAggregateInputType
  }

  export type SearchIndexGroupByOutputType = {
    id: string
    entityType: string
    entityId: string
    content: JsonValue
    keywords: string[]
    weight: number
    indexedAt: Date
    updatedAt: Date
    _count: SearchIndexCountAggregateOutputType | null
    _avg: SearchIndexAvgAggregateOutputType | null
    _sum: SearchIndexSumAggregateOutputType | null
    _min: SearchIndexMinAggregateOutputType | null
    _max: SearchIndexMaxAggregateOutputType | null
  }

  type GetSearchIndexGroupByPayload<T extends SearchIndexGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SearchIndexGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SearchIndexGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SearchIndexGroupByOutputType[P]>
            : GetScalarType<T[P], SearchIndexGroupByOutputType[P]>
        }
      >
    >


  export type SearchIndexSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    content?: boolean
    keywords?: boolean
    weight?: boolean
    indexedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchIndex"]>

  export type SearchIndexSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    content?: boolean
    keywords?: boolean
    weight?: boolean
    indexedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchIndex"]>

  export type SearchIndexSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    content?: boolean
    keywords?: boolean
    weight?: boolean
    indexedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchIndex"]>

  export type SearchIndexSelectScalar = {
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    content?: boolean
    keywords?: boolean
    weight?: boolean
    indexedAt?: boolean
    updatedAt?: boolean
  }

  export type SearchIndexOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "entityType" | "entityId" | "content" | "keywords" | "weight" | "indexedAt" | "updatedAt", ExtArgs["result"]["searchIndex"]>

  export type $SearchIndexPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SearchIndex"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entityType: string
      entityId: string
      content: Prisma.JsonValue
      keywords: string[]
      weight: number
      indexedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["searchIndex"]>
    composites: {}
  }

  type SearchIndexGetPayload<S extends boolean | null | undefined | SearchIndexDefaultArgs> = $Result.GetResult<Prisma.$SearchIndexPayload, S>

  type SearchIndexCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SearchIndexFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SearchIndexCountAggregateInputType | true
    }

  export interface SearchIndexDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SearchIndex'], meta: { name: 'SearchIndex' } }
    /**
     * Find zero or one SearchIndex that matches the filter.
     * @param {SearchIndexFindUniqueArgs} args - Arguments to find a SearchIndex
     * @example
     * // Get one SearchIndex
     * const searchIndex = await prisma.searchIndex.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SearchIndexFindUniqueArgs>(args: SelectSubset<T, SearchIndexFindUniqueArgs<ExtArgs>>): Prisma__SearchIndexClient<$Result.GetResult<Prisma.$SearchIndexPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SearchIndex that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SearchIndexFindUniqueOrThrowArgs} args - Arguments to find a SearchIndex
     * @example
     * // Get one SearchIndex
     * const searchIndex = await prisma.searchIndex.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SearchIndexFindUniqueOrThrowArgs>(args: SelectSubset<T, SearchIndexFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SearchIndexClient<$Result.GetResult<Prisma.$SearchIndexPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchIndex that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexFindFirstArgs} args - Arguments to find a SearchIndex
     * @example
     * // Get one SearchIndex
     * const searchIndex = await prisma.searchIndex.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SearchIndexFindFirstArgs>(args?: SelectSubset<T, SearchIndexFindFirstArgs<ExtArgs>>): Prisma__SearchIndexClient<$Result.GetResult<Prisma.$SearchIndexPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchIndex that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexFindFirstOrThrowArgs} args - Arguments to find a SearchIndex
     * @example
     * // Get one SearchIndex
     * const searchIndex = await prisma.searchIndex.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SearchIndexFindFirstOrThrowArgs>(args?: SelectSubset<T, SearchIndexFindFirstOrThrowArgs<ExtArgs>>): Prisma__SearchIndexClient<$Result.GetResult<Prisma.$SearchIndexPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SearchIndices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SearchIndices
     * const searchIndices = await prisma.searchIndex.findMany()
     * 
     * // Get first 10 SearchIndices
     * const searchIndices = await prisma.searchIndex.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const searchIndexWithIdOnly = await prisma.searchIndex.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SearchIndexFindManyArgs>(args?: SelectSubset<T, SearchIndexFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchIndexPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SearchIndex.
     * @param {SearchIndexCreateArgs} args - Arguments to create a SearchIndex.
     * @example
     * // Create one SearchIndex
     * const SearchIndex = await prisma.searchIndex.create({
     *   data: {
     *     // ... data to create a SearchIndex
     *   }
     * })
     * 
     */
    create<T extends SearchIndexCreateArgs>(args: SelectSubset<T, SearchIndexCreateArgs<ExtArgs>>): Prisma__SearchIndexClient<$Result.GetResult<Prisma.$SearchIndexPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SearchIndices.
     * @param {SearchIndexCreateManyArgs} args - Arguments to create many SearchIndices.
     * @example
     * // Create many SearchIndices
     * const searchIndex = await prisma.searchIndex.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SearchIndexCreateManyArgs>(args?: SelectSubset<T, SearchIndexCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SearchIndices and returns the data saved in the database.
     * @param {SearchIndexCreateManyAndReturnArgs} args - Arguments to create many SearchIndices.
     * @example
     * // Create many SearchIndices
     * const searchIndex = await prisma.searchIndex.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SearchIndices and only return the `id`
     * const searchIndexWithIdOnly = await prisma.searchIndex.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SearchIndexCreateManyAndReturnArgs>(args?: SelectSubset<T, SearchIndexCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchIndexPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SearchIndex.
     * @param {SearchIndexDeleteArgs} args - Arguments to delete one SearchIndex.
     * @example
     * // Delete one SearchIndex
     * const SearchIndex = await prisma.searchIndex.delete({
     *   where: {
     *     // ... filter to delete one SearchIndex
     *   }
     * })
     * 
     */
    delete<T extends SearchIndexDeleteArgs>(args: SelectSubset<T, SearchIndexDeleteArgs<ExtArgs>>): Prisma__SearchIndexClient<$Result.GetResult<Prisma.$SearchIndexPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SearchIndex.
     * @param {SearchIndexUpdateArgs} args - Arguments to update one SearchIndex.
     * @example
     * // Update one SearchIndex
     * const searchIndex = await prisma.searchIndex.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SearchIndexUpdateArgs>(args: SelectSubset<T, SearchIndexUpdateArgs<ExtArgs>>): Prisma__SearchIndexClient<$Result.GetResult<Prisma.$SearchIndexPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SearchIndices.
     * @param {SearchIndexDeleteManyArgs} args - Arguments to filter SearchIndices to delete.
     * @example
     * // Delete a few SearchIndices
     * const { count } = await prisma.searchIndex.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SearchIndexDeleteManyArgs>(args?: SelectSubset<T, SearchIndexDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchIndices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SearchIndices
     * const searchIndex = await prisma.searchIndex.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SearchIndexUpdateManyArgs>(args: SelectSubset<T, SearchIndexUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchIndices and returns the data updated in the database.
     * @param {SearchIndexUpdateManyAndReturnArgs} args - Arguments to update many SearchIndices.
     * @example
     * // Update many SearchIndices
     * const searchIndex = await prisma.searchIndex.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SearchIndices and only return the `id`
     * const searchIndexWithIdOnly = await prisma.searchIndex.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SearchIndexUpdateManyAndReturnArgs>(args: SelectSubset<T, SearchIndexUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchIndexPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SearchIndex.
     * @param {SearchIndexUpsertArgs} args - Arguments to update or create a SearchIndex.
     * @example
     * // Update or create a SearchIndex
     * const searchIndex = await prisma.searchIndex.upsert({
     *   create: {
     *     // ... data to create a SearchIndex
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SearchIndex we want to update
     *   }
     * })
     */
    upsert<T extends SearchIndexUpsertArgs>(args: SelectSubset<T, SearchIndexUpsertArgs<ExtArgs>>): Prisma__SearchIndexClient<$Result.GetResult<Prisma.$SearchIndexPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SearchIndices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexCountArgs} args - Arguments to filter SearchIndices to count.
     * @example
     * // Count the number of SearchIndices
     * const count = await prisma.searchIndex.count({
     *   where: {
     *     // ... the filter for the SearchIndices we want to count
     *   }
     * })
    **/
    count<T extends SearchIndexCountArgs>(
      args?: Subset<T, SearchIndexCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SearchIndexCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SearchIndex.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SearchIndexAggregateArgs>(args: Subset<T, SearchIndexAggregateArgs>): Prisma.PrismaPromise<GetSearchIndexAggregateType<T>>

    /**
     * Group by SearchIndex.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SearchIndexGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SearchIndexGroupByArgs['orderBy'] }
        : { orderBy?: SearchIndexGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SearchIndexGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSearchIndexGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SearchIndex model
   */
  readonly fields: SearchIndexFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SearchIndex.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SearchIndexClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SearchIndex model
   */
  interface SearchIndexFieldRefs {
    readonly id: FieldRef<"SearchIndex", 'String'>
    readonly entityType: FieldRef<"SearchIndex", 'String'>
    readonly entityId: FieldRef<"SearchIndex", 'String'>
    readonly content: FieldRef<"SearchIndex", 'Json'>
    readonly keywords: FieldRef<"SearchIndex", 'String[]'>
    readonly weight: FieldRef<"SearchIndex", 'Float'>
    readonly indexedAt: FieldRef<"SearchIndex", 'DateTime'>
    readonly updatedAt: FieldRef<"SearchIndex", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SearchIndex findUnique
   */
  export type SearchIndexFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
    /**
     * Filter, which SearchIndex to fetch.
     */
    where: SearchIndexWhereUniqueInput
  }

  /**
   * SearchIndex findUniqueOrThrow
   */
  export type SearchIndexFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
    /**
     * Filter, which SearchIndex to fetch.
     */
    where: SearchIndexWhereUniqueInput
  }

  /**
   * SearchIndex findFirst
   */
  export type SearchIndexFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
    /**
     * Filter, which SearchIndex to fetch.
     */
    where?: SearchIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchIndices to fetch.
     */
    orderBy?: SearchIndexOrderByWithRelationInput | SearchIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchIndices.
     */
    cursor?: SearchIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchIndices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchIndices.
     */
    distinct?: SearchIndexScalarFieldEnum | SearchIndexScalarFieldEnum[]
  }

  /**
   * SearchIndex findFirstOrThrow
   */
  export type SearchIndexFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
    /**
     * Filter, which SearchIndex to fetch.
     */
    where?: SearchIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchIndices to fetch.
     */
    orderBy?: SearchIndexOrderByWithRelationInput | SearchIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchIndices.
     */
    cursor?: SearchIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchIndices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchIndices.
     */
    distinct?: SearchIndexScalarFieldEnum | SearchIndexScalarFieldEnum[]
  }

  /**
   * SearchIndex findMany
   */
  export type SearchIndexFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
    /**
     * Filter, which SearchIndices to fetch.
     */
    where?: SearchIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchIndices to fetch.
     */
    orderBy?: SearchIndexOrderByWithRelationInput | SearchIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SearchIndices.
     */
    cursor?: SearchIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchIndices.
     */
    skip?: number
    distinct?: SearchIndexScalarFieldEnum | SearchIndexScalarFieldEnum[]
  }

  /**
   * SearchIndex create
   */
  export type SearchIndexCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
    /**
     * The data needed to create a SearchIndex.
     */
    data: XOR<SearchIndexCreateInput, SearchIndexUncheckedCreateInput>
  }

  /**
   * SearchIndex createMany
   */
  export type SearchIndexCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SearchIndices.
     */
    data: SearchIndexCreateManyInput | SearchIndexCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchIndex createManyAndReturn
   */
  export type SearchIndexCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
    /**
     * The data used to create many SearchIndices.
     */
    data: SearchIndexCreateManyInput | SearchIndexCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchIndex update
   */
  export type SearchIndexUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
    /**
     * The data needed to update a SearchIndex.
     */
    data: XOR<SearchIndexUpdateInput, SearchIndexUncheckedUpdateInput>
    /**
     * Choose, which SearchIndex to update.
     */
    where: SearchIndexWhereUniqueInput
  }

  /**
   * SearchIndex updateMany
   */
  export type SearchIndexUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SearchIndices.
     */
    data: XOR<SearchIndexUpdateManyMutationInput, SearchIndexUncheckedUpdateManyInput>
    /**
     * Filter which SearchIndices to update
     */
    where?: SearchIndexWhereInput
    /**
     * Limit how many SearchIndices to update.
     */
    limit?: number
  }

  /**
   * SearchIndex updateManyAndReturn
   */
  export type SearchIndexUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
    /**
     * The data used to update SearchIndices.
     */
    data: XOR<SearchIndexUpdateManyMutationInput, SearchIndexUncheckedUpdateManyInput>
    /**
     * Filter which SearchIndices to update
     */
    where?: SearchIndexWhereInput
    /**
     * Limit how many SearchIndices to update.
     */
    limit?: number
  }

  /**
   * SearchIndex upsert
   */
  export type SearchIndexUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
    /**
     * The filter to search for the SearchIndex to update in case it exists.
     */
    where: SearchIndexWhereUniqueInput
    /**
     * In case the SearchIndex found by the `where` argument doesn't exist, create a new SearchIndex with this data.
     */
    create: XOR<SearchIndexCreateInput, SearchIndexUncheckedCreateInput>
    /**
     * In case the SearchIndex was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SearchIndexUpdateInput, SearchIndexUncheckedUpdateInput>
  }

  /**
   * SearchIndex delete
   */
  export type SearchIndexDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
    /**
     * Filter which SearchIndex to delete.
     */
    where: SearchIndexWhereUniqueInput
  }

  /**
   * SearchIndex deleteMany
   */
  export type SearchIndexDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchIndices to delete
     */
    where?: SearchIndexWhereInput
    /**
     * Limit how many SearchIndices to delete.
     */
    limit?: number
  }

  /**
   * SearchIndex without action
   */
  export type SearchIndexDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndex
     */
    select?: SearchIndexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndex
     */
    omit?: SearchIndexOmit<ExtArgs> | null
  }


  /**
   * Model Analytics
   */

  export type AggregateAnalytics = {
    _count: AnalyticsCountAggregateOutputType | null
    _avg: AnalyticsAvgAggregateOutputType | null
    _sum: AnalyticsSumAggregateOutputType | null
    _min: AnalyticsMinAggregateOutputType | null
    _max: AnalyticsMaxAggregateOutputType | null
  }

  export type AnalyticsAvgAggregateOutputType = {
    value: number | null
  }

  export type AnalyticsSumAggregateOutputType = {
    value: number | null
  }

  export type AnalyticsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    event: $Enums.AnalyticsEvent | null
    value: number | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type AnalyticsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    event: $Enums.AnalyticsEvent | null
    value: number | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type AnalyticsCountAggregateOutputType = {
    id: number
    userId: number
    event: number
    properties: number
    value: number
    timestamp: number
    createdAt: number
    _all: number
  }


  export type AnalyticsAvgAggregateInputType = {
    value?: true
  }

  export type AnalyticsSumAggregateInputType = {
    value?: true
  }

  export type AnalyticsMinAggregateInputType = {
    id?: true
    userId?: true
    event?: true
    value?: true
    timestamp?: true
    createdAt?: true
  }

  export type AnalyticsMaxAggregateInputType = {
    id?: true
    userId?: true
    event?: true
    value?: true
    timestamp?: true
    createdAt?: true
  }

  export type AnalyticsCountAggregateInputType = {
    id?: true
    userId?: true
    event?: true
    properties?: true
    value?: true
    timestamp?: true
    createdAt?: true
    _all?: true
  }

  export type AnalyticsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Analytics to aggregate.
     */
    where?: AnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analytics to fetch.
     */
    orderBy?: AnalyticsOrderByWithRelationInput | AnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Analytics
    **/
    _count?: true | AnalyticsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnalyticsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnalyticsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalyticsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalyticsMaxAggregateInputType
  }

  export type GetAnalyticsAggregateType<T extends AnalyticsAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalytics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalytics[P]>
      : GetScalarType<T[P], AggregateAnalytics[P]>
  }




  export type AnalyticsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsWhereInput
    orderBy?: AnalyticsOrderByWithAggregationInput | AnalyticsOrderByWithAggregationInput[]
    by: AnalyticsScalarFieldEnum[] | AnalyticsScalarFieldEnum
    having?: AnalyticsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalyticsCountAggregateInputType | true
    _avg?: AnalyticsAvgAggregateInputType
    _sum?: AnalyticsSumAggregateInputType
    _min?: AnalyticsMinAggregateInputType
    _max?: AnalyticsMaxAggregateInputType
  }

  export type AnalyticsGroupByOutputType = {
    id: string
    userId: string | null
    event: $Enums.AnalyticsEvent
    properties: JsonValue
    value: number | null
    timestamp: Date
    createdAt: Date
    _count: AnalyticsCountAggregateOutputType | null
    _avg: AnalyticsAvgAggregateOutputType | null
    _sum: AnalyticsSumAggregateOutputType | null
    _min: AnalyticsMinAggregateOutputType | null
    _max: AnalyticsMaxAggregateOutputType | null
  }

  type GetAnalyticsGroupByPayload<T extends AnalyticsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalyticsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalyticsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalyticsGroupByOutputType[P]>
            : GetScalarType<T[P], AnalyticsGroupByOutputType[P]>
        }
      >
    >


  export type AnalyticsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    event?: boolean
    properties?: boolean
    value?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["analytics"]>

  export type AnalyticsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    event?: boolean
    properties?: boolean
    value?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["analytics"]>

  export type AnalyticsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    event?: boolean
    properties?: boolean
    value?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["analytics"]>

  export type AnalyticsSelectScalar = {
    id?: boolean
    userId?: boolean
    event?: boolean
    properties?: boolean
    value?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }

  export type AnalyticsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "event" | "properties" | "value" | "timestamp" | "createdAt", ExtArgs["result"]["analytics"]>

  export type $AnalyticsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Analytics"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      event: $Enums.AnalyticsEvent
      properties: Prisma.JsonValue
      value: number | null
      timestamp: Date
      createdAt: Date
    }, ExtArgs["result"]["analytics"]>
    composites: {}
  }

  type AnalyticsGetPayload<S extends boolean | null | undefined | AnalyticsDefaultArgs> = $Result.GetResult<Prisma.$AnalyticsPayload, S>

  type AnalyticsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalyticsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalyticsCountAggregateInputType | true
    }

  export interface AnalyticsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Analytics'], meta: { name: 'Analytics' } }
    /**
     * Find zero or one Analytics that matches the filter.
     * @param {AnalyticsFindUniqueArgs} args - Arguments to find a Analytics
     * @example
     * // Get one Analytics
     * const analytics = await prisma.analytics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalyticsFindUniqueArgs>(args: SelectSubset<T, AnalyticsFindUniqueArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Analytics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalyticsFindUniqueOrThrowArgs} args - Arguments to find a Analytics
     * @example
     * // Get one Analytics
     * const analytics = await prisma.analytics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalyticsFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalyticsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Analytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsFindFirstArgs} args - Arguments to find a Analytics
     * @example
     * // Get one Analytics
     * const analytics = await prisma.analytics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalyticsFindFirstArgs>(args?: SelectSubset<T, AnalyticsFindFirstArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Analytics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsFindFirstOrThrowArgs} args - Arguments to find a Analytics
     * @example
     * // Get one Analytics
     * const analytics = await prisma.analytics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalyticsFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalyticsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Analytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Analytics
     * const analytics = await prisma.analytics.findMany()
     * 
     * // Get first 10 Analytics
     * const analytics = await prisma.analytics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analyticsWithIdOnly = await prisma.analytics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalyticsFindManyArgs>(args?: SelectSubset<T, AnalyticsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Analytics.
     * @param {AnalyticsCreateArgs} args - Arguments to create a Analytics.
     * @example
     * // Create one Analytics
     * const Analytics = await prisma.analytics.create({
     *   data: {
     *     // ... data to create a Analytics
     *   }
     * })
     * 
     */
    create<T extends AnalyticsCreateArgs>(args: SelectSubset<T, AnalyticsCreateArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Analytics.
     * @param {AnalyticsCreateManyArgs} args - Arguments to create many Analytics.
     * @example
     * // Create many Analytics
     * const analytics = await prisma.analytics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalyticsCreateManyArgs>(args?: SelectSubset<T, AnalyticsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Analytics and returns the data saved in the database.
     * @param {AnalyticsCreateManyAndReturnArgs} args - Arguments to create many Analytics.
     * @example
     * // Create many Analytics
     * const analytics = await prisma.analytics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Analytics and only return the `id`
     * const analyticsWithIdOnly = await prisma.analytics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalyticsCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalyticsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Analytics.
     * @param {AnalyticsDeleteArgs} args - Arguments to delete one Analytics.
     * @example
     * // Delete one Analytics
     * const Analytics = await prisma.analytics.delete({
     *   where: {
     *     // ... filter to delete one Analytics
     *   }
     * })
     * 
     */
    delete<T extends AnalyticsDeleteArgs>(args: SelectSubset<T, AnalyticsDeleteArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Analytics.
     * @param {AnalyticsUpdateArgs} args - Arguments to update one Analytics.
     * @example
     * // Update one Analytics
     * const analytics = await prisma.analytics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalyticsUpdateArgs>(args: SelectSubset<T, AnalyticsUpdateArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Analytics.
     * @param {AnalyticsDeleteManyArgs} args - Arguments to filter Analytics to delete.
     * @example
     * // Delete a few Analytics
     * const { count } = await prisma.analytics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalyticsDeleteManyArgs>(args?: SelectSubset<T, AnalyticsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Analytics
     * const analytics = await prisma.analytics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalyticsUpdateManyArgs>(args: SelectSubset<T, AnalyticsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Analytics and returns the data updated in the database.
     * @param {AnalyticsUpdateManyAndReturnArgs} args - Arguments to update many Analytics.
     * @example
     * // Update many Analytics
     * const analytics = await prisma.analytics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Analytics and only return the `id`
     * const analyticsWithIdOnly = await prisma.analytics.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnalyticsUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalyticsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Analytics.
     * @param {AnalyticsUpsertArgs} args - Arguments to update or create a Analytics.
     * @example
     * // Update or create a Analytics
     * const analytics = await prisma.analytics.upsert({
     *   create: {
     *     // ... data to create a Analytics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Analytics we want to update
     *   }
     * })
     */
    upsert<T extends AnalyticsUpsertArgs>(args: SelectSubset<T, AnalyticsUpsertArgs<ExtArgs>>): Prisma__AnalyticsClient<$Result.GetResult<Prisma.$AnalyticsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsCountArgs} args - Arguments to filter Analytics to count.
     * @example
     * // Count the number of Analytics
     * const count = await prisma.analytics.count({
     *   where: {
     *     // ... the filter for the Analytics we want to count
     *   }
     * })
    **/
    count<T extends AnalyticsCountArgs>(
      args?: Subset<T, AnalyticsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalyticsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalyticsAggregateArgs>(args: Subset<T, AnalyticsAggregateArgs>): Prisma.PrismaPromise<GetAnalyticsAggregateType<T>>

    /**
     * Group by Analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalyticsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalyticsGroupByArgs['orderBy'] }
        : { orderBy?: AnalyticsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalyticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalyticsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Analytics model
   */
  readonly fields: AnalyticsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Analytics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalyticsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Analytics model
   */
  interface AnalyticsFieldRefs {
    readonly id: FieldRef<"Analytics", 'String'>
    readonly userId: FieldRef<"Analytics", 'String'>
    readonly event: FieldRef<"Analytics", 'AnalyticsEvent'>
    readonly properties: FieldRef<"Analytics", 'Json'>
    readonly value: FieldRef<"Analytics", 'Float'>
    readonly timestamp: FieldRef<"Analytics", 'DateTime'>
    readonly createdAt: FieldRef<"Analytics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Analytics findUnique
   */
  export type AnalyticsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Filter, which Analytics to fetch.
     */
    where: AnalyticsWhereUniqueInput
  }

  /**
   * Analytics findUniqueOrThrow
   */
  export type AnalyticsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Filter, which Analytics to fetch.
     */
    where: AnalyticsWhereUniqueInput
  }

  /**
   * Analytics findFirst
   */
  export type AnalyticsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Filter, which Analytics to fetch.
     */
    where?: AnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analytics to fetch.
     */
    orderBy?: AnalyticsOrderByWithRelationInput | AnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Analytics.
     */
    cursor?: AnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Analytics.
     */
    distinct?: AnalyticsScalarFieldEnum | AnalyticsScalarFieldEnum[]
  }

  /**
   * Analytics findFirstOrThrow
   */
  export type AnalyticsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Filter, which Analytics to fetch.
     */
    where?: AnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analytics to fetch.
     */
    orderBy?: AnalyticsOrderByWithRelationInput | AnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Analytics.
     */
    cursor?: AnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Analytics.
     */
    distinct?: AnalyticsScalarFieldEnum | AnalyticsScalarFieldEnum[]
  }

  /**
   * Analytics findMany
   */
  export type AnalyticsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Filter, which Analytics to fetch.
     */
    where?: AnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analytics to fetch.
     */
    orderBy?: AnalyticsOrderByWithRelationInput | AnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Analytics.
     */
    cursor?: AnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analytics.
     */
    skip?: number
    distinct?: AnalyticsScalarFieldEnum | AnalyticsScalarFieldEnum[]
  }

  /**
   * Analytics create
   */
  export type AnalyticsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * The data needed to create a Analytics.
     */
    data: XOR<AnalyticsCreateInput, AnalyticsUncheckedCreateInput>
  }

  /**
   * Analytics createMany
   */
  export type AnalyticsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Analytics.
     */
    data: AnalyticsCreateManyInput | AnalyticsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Analytics createManyAndReturn
   */
  export type AnalyticsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * The data used to create many Analytics.
     */
    data: AnalyticsCreateManyInput | AnalyticsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Analytics update
   */
  export type AnalyticsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * The data needed to update a Analytics.
     */
    data: XOR<AnalyticsUpdateInput, AnalyticsUncheckedUpdateInput>
    /**
     * Choose, which Analytics to update.
     */
    where: AnalyticsWhereUniqueInput
  }

  /**
   * Analytics updateMany
   */
  export type AnalyticsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Analytics.
     */
    data: XOR<AnalyticsUpdateManyMutationInput, AnalyticsUncheckedUpdateManyInput>
    /**
     * Filter which Analytics to update
     */
    where?: AnalyticsWhereInput
    /**
     * Limit how many Analytics to update.
     */
    limit?: number
  }

  /**
   * Analytics updateManyAndReturn
   */
  export type AnalyticsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * The data used to update Analytics.
     */
    data: XOR<AnalyticsUpdateManyMutationInput, AnalyticsUncheckedUpdateManyInput>
    /**
     * Filter which Analytics to update
     */
    where?: AnalyticsWhereInput
    /**
     * Limit how many Analytics to update.
     */
    limit?: number
  }

  /**
   * Analytics upsert
   */
  export type AnalyticsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * The filter to search for the Analytics to update in case it exists.
     */
    where: AnalyticsWhereUniqueInput
    /**
     * In case the Analytics found by the `where` argument doesn't exist, create a new Analytics with this data.
     */
    create: XOR<AnalyticsCreateInput, AnalyticsUncheckedCreateInput>
    /**
     * In case the Analytics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalyticsUpdateInput, AnalyticsUncheckedUpdateInput>
  }

  /**
   * Analytics delete
   */
  export type AnalyticsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
    /**
     * Filter which Analytics to delete.
     */
    where: AnalyticsWhereUniqueInput
  }

  /**
   * Analytics deleteMany
   */
  export type AnalyticsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Analytics to delete
     */
    where?: AnalyticsWhereInput
    /**
     * Limit how many Analytics to delete.
     */
    limit?: number
  }

  /**
   * Analytics without action
   */
  export type AnalyticsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analytics
     */
    select?: AnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analytics
     */
    omit?: AnalyticsOmit<ExtArgs> | null
  }


  /**
   * Model Export
   */

  export type AggregateExport = {
    _count: ExportCountAggregateOutputType | null
    _avg: ExportAvgAggregateOutputType | null
    _sum: ExportSumAggregateOutputType | null
    _min: ExportMinAggregateOutputType | null
    _max: ExportMaxAggregateOutputType | null
  }

  export type ExportAvgAggregateOutputType = {
    fileSize: number | null
    processingTime: number | null
  }

  export type ExportSumAggregateOutputType = {
    fileSize: number | null
    processingTime: number | null
  }

  export type ExportMinAggregateOutputType = {
    id: string | null
    presentationId: string | null
    format: string | null
    fileSize: number | null
    downloadUrl: string | null
    expiresAt: Date | null
    processingTime: number | null
    status: $Enums.ExportStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExportMaxAggregateOutputType = {
    id: string | null
    presentationId: string | null
    format: string | null
    fileSize: number | null
    downloadUrl: string | null
    expiresAt: Date | null
    processingTime: number | null
    status: $Enums.ExportStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExportCountAggregateOutputType = {
    id: number
    presentationId: number
    format: number
    options: number
    fileSize: number
    downloadUrl: number
    expiresAt: number
    processingTime: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExportAvgAggregateInputType = {
    fileSize?: true
    processingTime?: true
  }

  export type ExportSumAggregateInputType = {
    fileSize?: true
    processingTime?: true
  }

  export type ExportMinAggregateInputType = {
    id?: true
    presentationId?: true
    format?: true
    fileSize?: true
    downloadUrl?: true
    expiresAt?: true
    processingTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExportMaxAggregateInputType = {
    id?: true
    presentationId?: true
    format?: true
    fileSize?: true
    downloadUrl?: true
    expiresAt?: true
    processingTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExportCountAggregateInputType = {
    id?: true
    presentationId?: true
    format?: true
    options?: true
    fileSize?: true
    downloadUrl?: true
    expiresAt?: true
    processingTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Export to aggregate.
     */
    where?: ExportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exports to fetch.
     */
    orderBy?: ExportOrderByWithRelationInput | ExportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exports
    **/
    _count?: true | ExportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExportMaxAggregateInputType
  }

  export type GetExportAggregateType<T extends ExportAggregateArgs> = {
        [P in keyof T & keyof AggregateExport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExport[P]>
      : GetScalarType<T[P], AggregateExport[P]>
  }




  export type ExportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExportWhereInput
    orderBy?: ExportOrderByWithAggregationInput | ExportOrderByWithAggregationInput[]
    by: ExportScalarFieldEnum[] | ExportScalarFieldEnum
    having?: ExportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExportCountAggregateInputType | true
    _avg?: ExportAvgAggregateInputType
    _sum?: ExportSumAggregateInputType
    _min?: ExportMinAggregateInputType
    _max?: ExportMaxAggregateInputType
  }

  export type ExportGroupByOutputType = {
    id: string
    presentationId: string
    format: string
    options: JsonValue
    fileSize: number
    downloadUrl: string
    expiresAt: Date
    processingTime: number
    status: $Enums.ExportStatus
    createdAt: Date
    updatedAt: Date
    _count: ExportCountAggregateOutputType | null
    _avg: ExportAvgAggregateOutputType | null
    _sum: ExportSumAggregateOutputType | null
    _min: ExportMinAggregateOutputType | null
    _max: ExportMaxAggregateOutputType | null
  }

  type GetExportGroupByPayload<T extends ExportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExportGroupByOutputType[P]>
            : GetScalarType<T[P], ExportGroupByOutputType[P]>
        }
      >
    >


  export type ExportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presentationId?: boolean
    format?: boolean
    options?: boolean
    fileSize?: boolean
    downloadUrl?: boolean
    expiresAt?: boolean
    processingTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["export"]>

  export type ExportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presentationId?: boolean
    format?: boolean
    options?: boolean
    fileSize?: boolean
    downloadUrl?: boolean
    expiresAt?: boolean
    processingTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["export"]>

  export type ExportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presentationId?: boolean
    format?: boolean
    options?: boolean
    fileSize?: boolean
    downloadUrl?: boolean
    expiresAt?: boolean
    processingTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["export"]>

  export type ExportSelectScalar = {
    id?: boolean
    presentationId?: boolean
    format?: boolean
    options?: boolean
    fileSize?: boolean
    downloadUrl?: boolean
    expiresAt?: boolean
    processingTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "presentationId" | "format" | "options" | "fileSize" | "downloadUrl" | "expiresAt" | "processingTime" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["export"]>
  export type ExportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
  }
  export type ExportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
  }
  export type ExportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presentation?: boolean | PresentationDefaultArgs<ExtArgs>
  }

  export type $ExportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Export"
    objects: {
      presentation: Prisma.$PresentationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      presentationId: string
      format: string
      options: Prisma.JsonValue
      fileSize: number
      downloadUrl: string
      expiresAt: Date
      processingTime: number
      status: $Enums.ExportStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["export"]>
    composites: {}
  }

  type ExportGetPayload<S extends boolean | null | undefined | ExportDefaultArgs> = $Result.GetResult<Prisma.$ExportPayload, S>

  type ExportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExportCountAggregateInputType | true
    }

  export interface ExportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Export'], meta: { name: 'Export' } }
    /**
     * Find zero or one Export that matches the filter.
     * @param {ExportFindUniqueArgs} args - Arguments to find a Export
     * @example
     * // Get one Export
     * const export = await prisma.export.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExportFindUniqueArgs>(args: SelectSubset<T, ExportFindUniqueArgs<ExtArgs>>): Prisma__ExportClient<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Export that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExportFindUniqueOrThrowArgs} args - Arguments to find a Export
     * @example
     * // Get one Export
     * const export = await prisma.export.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExportFindUniqueOrThrowArgs>(args: SelectSubset<T, ExportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExportClient<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Export that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportFindFirstArgs} args - Arguments to find a Export
     * @example
     * // Get one Export
     * const export = await prisma.export.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExportFindFirstArgs>(args?: SelectSubset<T, ExportFindFirstArgs<ExtArgs>>): Prisma__ExportClient<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Export that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportFindFirstOrThrowArgs} args - Arguments to find a Export
     * @example
     * // Get one Export
     * const export = await prisma.export.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExportFindFirstOrThrowArgs>(args?: SelectSubset<T, ExportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExportClient<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exports
     * const exports = await prisma.export.findMany()
     * 
     * // Get first 10 Exports
     * const exports = await prisma.export.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exportWithIdOnly = await prisma.export.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExportFindManyArgs>(args?: SelectSubset<T, ExportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Export.
     * @param {ExportCreateArgs} args - Arguments to create a Export.
     * @example
     * // Create one Export
     * const Export = await prisma.export.create({
     *   data: {
     *     // ... data to create a Export
     *   }
     * })
     * 
     */
    create<T extends ExportCreateArgs>(args: SelectSubset<T, ExportCreateArgs<ExtArgs>>): Prisma__ExportClient<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Exports.
     * @param {ExportCreateManyArgs} args - Arguments to create many Exports.
     * @example
     * // Create many Exports
     * const export = await prisma.export.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExportCreateManyArgs>(args?: SelectSubset<T, ExportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exports and returns the data saved in the database.
     * @param {ExportCreateManyAndReturnArgs} args - Arguments to create many Exports.
     * @example
     * // Create many Exports
     * const export = await prisma.export.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exports and only return the `id`
     * const exportWithIdOnly = await prisma.export.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExportCreateManyAndReturnArgs>(args?: SelectSubset<T, ExportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Export.
     * @param {ExportDeleteArgs} args - Arguments to delete one Export.
     * @example
     * // Delete one Export
     * const Export = await prisma.export.delete({
     *   where: {
     *     // ... filter to delete one Export
     *   }
     * })
     * 
     */
    delete<T extends ExportDeleteArgs>(args: SelectSubset<T, ExportDeleteArgs<ExtArgs>>): Prisma__ExportClient<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Export.
     * @param {ExportUpdateArgs} args - Arguments to update one Export.
     * @example
     * // Update one Export
     * const export = await prisma.export.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExportUpdateArgs>(args: SelectSubset<T, ExportUpdateArgs<ExtArgs>>): Prisma__ExportClient<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Exports.
     * @param {ExportDeleteManyArgs} args - Arguments to filter Exports to delete.
     * @example
     * // Delete a few Exports
     * const { count } = await prisma.export.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExportDeleteManyArgs>(args?: SelectSubset<T, ExportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exports
     * const export = await prisma.export.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExportUpdateManyArgs>(args: SelectSubset<T, ExportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exports and returns the data updated in the database.
     * @param {ExportUpdateManyAndReturnArgs} args - Arguments to update many Exports.
     * @example
     * // Update many Exports
     * const export = await prisma.export.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Exports and only return the `id`
     * const exportWithIdOnly = await prisma.export.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExportUpdateManyAndReturnArgs>(args: SelectSubset<T, ExportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Export.
     * @param {ExportUpsertArgs} args - Arguments to update or create a Export.
     * @example
     * // Update or create a Export
     * const export = await prisma.export.upsert({
     *   create: {
     *     // ... data to create a Export
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Export we want to update
     *   }
     * })
     */
    upsert<T extends ExportUpsertArgs>(args: SelectSubset<T, ExportUpsertArgs<ExtArgs>>): Prisma__ExportClient<$Result.GetResult<Prisma.$ExportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Exports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportCountArgs} args - Arguments to filter Exports to count.
     * @example
     * // Count the number of Exports
     * const count = await prisma.export.count({
     *   where: {
     *     // ... the filter for the Exports we want to count
     *   }
     * })
    **/
    count<T extends ExportCountArgs>(
      args?: Subset<T, ExportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Export.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExportAggregateArgs>(args: Subset<T, ExportAggregateArgs>): Prisma.PrismaPromise<GetExportAggregateType<T>>

    /**
     * Group by Export.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExportGroupByArgs['orderBy'] }
        : { orderBy?: ExportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Export model
   */
  readonly fields: ExportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Export.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    presentation<T extends PresentationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PresentationDefaultArgs<ExtArgs>>): Prisma__PresentationClient<$Result.GetResult<Prisma.$PresentationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Export model
   */
  interface ExportFieldRefs {
    readonly id: FieldRef<"Export", 'String'>
    readonly presentationId: FieldRef<"Export", 'String'>
    readonly format: FieldRef<"Export", 'String'>
    readonly options: FieldRef<"Export", 'Json'>
    readonly fileSize: FieldRef<"Export", 'Int'>
    readonly downloadUrl: FieldRef<"Export", 'String'>
    readonly expiresAt: FieldRef<"Export", 'DateTime'>
    readonly processingTime: FieldRef<"Export", 'Int'>
    readonly status: FieldRef<"Export", 'ExportStatus'>
    readonly createdAt: FieldRef<"Export", 'DateTime'>
    readonly updatedAt: FieldRef<"Export", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Export findUnique
   */
  export type ExportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportInclude<ExtArgs> | null
    /**
     * Filter, which Export to fetch.
     */
    where: ExportWhereUniqueInput
  }

  /**
   * Export findUniqueOrThrow
   */
  export type ExportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportInclude<ExtArgs> | null
    /**
     * Filter, which Export to fetch.
     */
    where: ExportWhereUniqueInput
  }

  /**
   * Export findFirst
   */
  export type ExportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportInclude<ExtArgs> | null
    /**
     * Filter, which Export to fetch.
     */
    where?: ExportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exports to fetch.
     */
    orderBy?: ExportOrderByWithRelationInput | ExportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exports.
     */
    cursor?: ExportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exports.
     */
    distinct?: ExportScalarFieldEnum | ExportScalarFieldEnum[]
  }

  /**
   * Export findFirstOrThrow
   */
  export type ExportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportInclude<ExtArgs> | null
    /**
     * Filter, which Export to fetch.
     */
    where?: ExportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exports to fetch.
     */
    orderBy?: ExportOrderByWithRelationInput | ExportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exports.
     */
    cursor?: ExportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exports.
     */
    distinct?: ExportScalarFieldEnum | ExportScalarFieldEnum[]
  }

  /**
   * Export findMany
   */
  export type ExportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportInclude<ExtArgs> | null
    /**
     * Filter, which Exports to fetch.
     */
    where?: ExportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exports to fetch.
     */
    orderBy?: ExportOrderByWithRelationInput | ExportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exports.
     */
    cursor?: ExportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exports.
     */
    skip?: number
    distinct?: ExportScalarFieldEnum | ExportScalarFieldEnum[]
  }

  /**
   * Export create
   */
  export type ExportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportInclude<ExtArgs> | null
    /**
     * The data needed to create a Export.
     */
    data: XOR<ExportCreateInput, ExportUncheckedCreateInput>
  }

  /**
   * Export createMany
   */
  export type ExportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exports.
     */
    data: ExportCreateManyInput | ExportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Export createManyAndReturn
   */
  export type ExportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * The data used to create many Exports.
     */
    data: ExportCreateManyInput | ExportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Export update
   */
  export type ExportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportInclude<ExtArgs> | null
    /**
     * The data needed to update a Export.
     */
    data: XOR<ExportUpdateInput, ExportUncheckedUpdateInput>
    /**
     * Choose, which Export to update.
     */
    where: ExportWhereUniqueInput
  }

  /**
   * Export updateMany
   */
  export type ExportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exports.
     */
    data: XOR<ExportUpdateManyMutationInput, ExportUncheckedUpdateManyInput>
    /**
     * Filter which Exports to update
     */
    where?: ExportWhereInput
    /**
     * Limit how many Exports to update.
     */
    limit?: number
  }

  /**
   * Export updateManyAndReturn
   */
  export type ExportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * The data used to update Exports.
     */
    data: XOR<ExportUpdateManyMutationInput, ExportUncheckedUpdateManyInput>
    /**
     * Filter which Exports to update
     */
    where?: ExportWhereInput
    /**
     * Limit how many Exports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Export upsert
   */
  export type ExportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportInclude<ExtArgs> | null
    /**
     * The filter to search for the Export to update in case it exists.
     */
    where: ExportWhereUniqueInput
    /**
     * In case the Export found by the `where` argument doesn't exist, create a new Export with this data.
     */
    create: XOR<ExportCreateInput, ExportUncheckedCreateInput>
    /**
     * In case the Export was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExportUpdateInput, ExportUncheckedUpdateInput>
  }

  /**
   * Export delete
   */
  export type ExportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportInclude<ExtArgs> | null
    /**
     * Filter which Export to delete.
     */
    where: ExportWhereUniqueInput
  }

  /**
   * Export deleteMany
   */
  export type ExportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exports to delete
     */
    where?: ExportWhereInput
    /**
     * Limit how many Exports to delete.
     */
    limit?: number
  }

  /**
   * Export without action
   */
  export type ExportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Export
     */
    select?: ExportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Export
     */
    omit?: ExportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    avatar: 'avatar',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const PresentationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    userId: 'userId',
    templateId: 'templateId',
    status: 'status',
    data: 'data',
    settings: 'settings',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PresentationScalarFieldEnum = (typeof PresentationScalarFieldEnum)[keyof typeof PresentationScalarFieldEnum]


  export const SlideScalarFieldEnum: {
    id: 'id',
    presentationId: 'presentationId',
    order: 'order',
    title: 'title',
    content: 'content',
    background: 'background',
    transitions: 'transitions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SlideScalarFieldEnum = (typeof SlideScalarFieldEnum)[keyof typeof SlideScalarFieldEnum]


  export const ElementScalarFieldEnum: {
    id: 'id',
    slideId: 'slideId',
    type: 'type',
    content: 'content',
    zIndex: 'zIndex',
    locked: 'locked',
    visible: 'visible',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ElementScalarFieldEnum = (typeof ElementScalarFieldEnum)[keyof typeof ElementScalarFieldEnum]


  export const TemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    category: 'category',
    thumbnail: 'thumbnail',
    data: 'data',
    tags: 'tags',
    isPublic: 'isPublic',
    downloads: 'downloads',
    rating: 'rating',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TemplateScalarFieldEnum = (typeof TemplateScalarFieldEnum)[keyof typeof TemplateScalarFieldEnum]


  export const CollaborationScalarFieldEnum: {
    id: 'id',
    presentationId: 'presentationId',
    userId: 'userId',
    role: 'role',
    permissions: 'permissions',
    joinedAt: 'joinedAt',
    lastActiveAt: 'lastActiveAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CollaborationScalarFieldEnum = (typeof CollaborationScalarFieldEnum)[keyof typeof CollaborationScalarFieldEnum]


  export const PresenceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    presentationId: 'presentationId',
    socketId: 'socketId',
    cursor: 'cursor',
    status: 'status',
    lastSeen: 'lastSeen',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PresenceScalarFieldEnum = (typeof PresenceScalarFieldEnum)[keyof typeof PresenceScalarFieldEnum]


  export const StorageFileScalarFieldEnum: {
    id: 'id',
    originalName: 'originalName',
    filename: 'filename',
    mimeType: 'mimeType',
    size: 'size',
    url: 'url',
    key: 'key',
    bucket: 'bucket',
    region: 'region',
    uploadedBy: 'uploadedBy',
    isPublic: 'isPublic',
    downloads: 'downloads',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    entry: 'entry'
  };

  export type StorageFileScalarFieldEnum = (typeof StorageFileScalarFieldEnum)[keyof typeof StorageFileScalarFieldEnum]


  export const AIGenerationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    prompt: 'prompt',
    model: 'model',
    response: 'response',
    tokens: 'tokens',
    cost: 'cost',
    latency: 'latency',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIGenerationScalarFieldEnum = (typeof AIGenerationScalarFieldEnum)[keyof typeof AIGenerationScalarFieldEnum]


  export const QueueJobScalarFieldEnum: {
    id: 'id',
    type: 'type',
    data: 'data',
    priority: 'priority',
    status: 'status',
    attempts: 'attempts',
    maxAttempts: 'maxAttempts',
    scheduledAt: 'scheduledAt',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    failedAt: 'failedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QueueJobScalarFieldEnum = (typeof QueueJobScalarFieldEnum)[keyof typeof QueueJobScalarFieldEnum]


  export const SearchIndexScalarFieldEnum: {
    id: 'id',
    entityType: 'entityType',
    entityId: 'entityId',
    content: 'content',
    keywords: 'keywords',
    weight: 'weight',
    indexedAt: 'indexedAt',
    updatedAt: 'updatedAt'
  };

  export type SearchIndexScalarFieldEnum = (typeof SearchIndexScalarFieldEnum)[keyof typeof SearchIndexScalarFieldEnum]


  export const AnalyticsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    event: 'event',
    properties: 'properties',
    value: 'value',
    timestamp: 'timestamp',
    createdAt: 'createdAt'
  };

  export type AnalyticsScalarFieldEnum = (typeof AnalyticsScalarFieldEnum)[keyof typeof AnalyticsScalarFieldEnum]


  export const ExportScalarFieldEnum: {
    id: 'id',
    presentationId: 'presentationId',
    format: 'format',
    options: 'options',
    fileSize: 'fileSize',
    downloadUrl: 'downloadUrl',
    expiresAt: 'expiresAt',
    processingTime: 'processingTime',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExportScalarFieldEnum = (typeof ExportScalarFieldEnum)[keyof typeof ExportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AccountType'
   */
  export type EnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType'>
    


  /**
   * Reference to a field of type 'AccountType[]'
   */
  export type ListEnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType[]'>
    


  /**
   * Reference to a field of type 'PresentationStatus'
   */
  export type EnumPresentationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PresentationStatus'>
    


  /**
   * Reference to a field of type 'PresentationStatus[]'
   */
  export type ListEnumPresentationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PresentationStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ElementType'
   */
  export type EnumElementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ElementType'>
    


  /**
   * Reference to a field of type 'ElementType[]'
   */
  export type ListEnumElementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ElementType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'CollaborationRole'
   */
  export type EnumCollaborationRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CollaborationRole'>
    


  /**
   * Reference to a field of type 'CollaborationRole[]'
   */
  export type ListEnumCollaborationRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CollaborationRole[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'GenerationStatus'
   */
  export type EnumGenerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GenerationStatus'>
    


  /**
   * Reference to a field of type 'GenerationStatus[]'
   */
  export type ListEnumGenerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GenerationStatus[]'>
    


  /**
   * Reference to a field of type 'JobType'
   */
  export type EnumJobTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobType'>
    


  /**
   * Reference to a field of type 'JobType[]'
   */
  export type ListEnumJobTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobType[]'>
    


  /**
   * Reference to a field of type 'JobPriority'
   */
  export type EnumJobPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobPriority'>
    


  /**
   * Reference to a field of type 'JobPriority[]'
   */
  export type ListEnumJobPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobPriority[]'>
    


  /**
   * Reference to a field of type 'JobStatus'
   */
  export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>
    


  /**
   * Reference to a field of type 'JobStatus[]'
   */
  export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>
    


  /**
   * Reference to a field of type 'AnalyticsEvent'
   */
  export type EnumAnalyticsEventFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnalyticsEvent'>
    


  /**
   * Reference to a field of type 'AnalyticsEvent[]'
   */
  export type ListEnumAnalyticsEventFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnalyticsEvent[]'>
    


  /**
   * Reference to a field of type 'ExportStatus'
   */
  export type EnumExportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExportStatus'>
    


  /**
   * Reference to a field of type 'ExportStatus[]'
   */
  export type ListEnumExportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExportStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: EnumAccountTypeFilter<"Account"> | $Enums.AccountType
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringNullableFilter<"Account"> | string | null
    accessToken?: StringFilter<"Account"> | string
    refreshToken?: StringNullableFilter<"Account"> | string | null
    expiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: EnumAccountTypeFilter<"Account"> | $Enums.AccountType
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringNullableFilter<"Account"> | string | null
    accessToken?: StringFilter<"Account"> | string
    refreshToken?: StringNullableFilter<"Account"> | string | null
    expiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: EnumAccountTypeWithAggregatesFilter<"Account"> | $Enums.AccountType
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessToken?: StringWithAggregatesFilter<"Account"> | string
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type PresentationWhereInput = {
    AND?: PresentationWhereInput | PresentationWhereInput[]
    OR?: PresentationWhereInput[]
    NOT?: PresentationWhereInput | PresentationWhereInput[]
    id?: StringFilter<"Presentation"> | string
    title?: StringFilter<"Presentation"> | string
    description?: StringNullableFilter<"Presentation"> | string | null
    userId?: StringFilter<"Presentation"> | string
    templateId?: StringNullableFilter<"Presentation"> | string | null
    status?: EnumPresentationStatusFilter<"Presentation"> | $Enums.PresentationStatus
    data?: JsonNullableFilter<"Presentation">
    settings?: JsonNullableFilter<"Presentation">
    createdAt?: DateTimeFilter<"Presentation"> | Date | string
    updatedAt?: DateTimeFilter<"Presentation"> | Date | string
    slides?: SlideListRelationFilter
    exports?: ExportListRelationFilter
  }

  export type PresentationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    userId?: SortOrder
    templateId?: SortOrderInput | SortOrder
    status?: SortOrder
    data?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slides?: SlideOrderByRelationAggregateInput
    exports?: ExportOrderByRelationAggregateInput
  }

  export type PresentationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PresentationWhereInput | PresentationWhereInput[]
    OR?: PresentationWhereInput[]
    NOT?: PresentationWhereInput | PresentationWhereInput[]
    title?: StringFilter<"Presentation"> | string
    description?: StringNullableFilter<"Presentation"> | string | null
    userId?: StringFilter<"Presentation"> | string
    templateId?: StringNullableFilter<"Presentation"> | string | null
    status?: EnumPresentationStatusFilter<"Presentation"> | $Enums.PresentationStatus
    data?: JsonNullableFilter<"Presentation">
    settings?: JsonNullableFilter<"Presentation">
    createdAt?: DateTimeFilter<"Presentation"> | Date | string
    updatedAt?: DateTimeFilter<"Presentation"> | Date | string
    slides?: SlideListRelationFilter
    exports?: ExportListRelationFilter
  }, "id">

  export type PresentationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    userId?: SortOrder
    templateId?: SortOrderInput | SortOrder
    status?: SortOrder
    data?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PresentationCountOrderByAggregateInput
    _max?: PresentationMaxOrderByAggregateInput
    _min?: PresentationMinOrderByAggregateInput
  }

  export type PresentationScalarWhereWithAggregatesInput = {
    AND?: PresentationScalarWhereWithAggregatesInput | PresentationScalarWhereWithAggregatesInput[]
    OR?: PresentationScalarWhereWithAggregatesInput[]
    NOT?: PresentationScalarWhereWithAggregatesInput | PresentationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Presentation"> | string
    title?: StringWithAggregatesFilter<"Presentation"> | string
    description?: StringNullableWithAggregatesFilter<"Presentation"> | string | null
    userId?: StringWithAggregatesFilter<"Presentation"> | string
    templateId?: StringNullableWithAggregatesFilter<"Presentation"> | string | null
    status?: EnumPresentationStatusWithAggregatesFilter<"Presentation"> | $Enums.PresentationStatus
    data?: JsonNullableWithAggregatesFilter<"Presentation">
    settings?: JsonNullableWithAggregatesFilter<"Presentation">
    createdAt?: DateTimeWithAggregatesFilter<"Presentation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Presentation"> | Date | string
  }

  export type SlideWhereInput = {
    AND?: SlideWhereInput | SlideWhereInput[]
    OR?: SlideWhereInput[]
    NOT?: SlideWhereInput | SlideWhereInput[]
    id?: StringFilter<"Slide"> | string
    presentationId?: StringFilter<"Slide"> | string
    order?: IntFilter<"Slide"> | number
    title?: StringFilter<"Slide"> | string
    content?: JsonNullableFilter<"Slide">
    background?: JsonNullableFilter<"Slide">
    transitions?: JsonNullableFilter<"Slide">
    createdAt?: DateTimeFilter<"Slide"> | Date | string
    updatedAt?: DateTimeFilter<"Slide"> | Date | string
    presentation?: XOR<PresentationScalarRelationFilter, PresentationWhereInput>
    elements?: ElementListRelationFilter
  }

  export type SlideOrderByWithRelationInput = {
    id?: SortOrder
    presentationId?: SortOrder
    order?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    background?: SortOrderInput | SortOrder
    transitions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    presentation?: PresentationOrderByWithRelationInput
    elements?: ElementOrderByRelationAggregateInput
  }

  export type SlideWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SlideWhereInput | SlideWhereInput[]
    OR?: SlideWhereInput[]
    NOT?: SlideWhereInput | SlideWhereInput[]
    presentationId?: StringFilter<"Slide"> | string
    order?: IntFilter<"Slide"> | number
    title?: StringFilter<"Slide"> | string
    content?: JsonNullableFilter<"Slide">
    background?: JsonNullableFilter<"Slide">
    transitions?: JsonNullableFilter<"Slide">
    createdAt?: DateTimeFilter<"Slide"> | Date | string
    updatedAt?: DateTimeFilter<"Slide"> | Date | string
    presentation?: XOR<PresentationScalarRelationFilter, PresentationWhereInput>
    elements?: ElementListRelationFilter
  }, "id">

  export type SlideOrderByWithAggregationInput = {
    id?: SortOrder
    presentationId?: SortOrder
    order?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    background?: SortOrderInput | SortOrder
    transitions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SlideCountOrderByAggregateInput
    _avg?: SlideAvgOrderByAggregateInput
    _max?: SlideMaxOrderByAggregateInput
    _min?: SlideMinOrderByAggregateInput
    _sum?: SlideSumOrderByAggregateInput
  }

  export type SlideScalarWhereWithAggregatesInput = {
    AND?: SlideScalarWhereWithAggregatesInput | SlideScalarWhereWithAggregatesInput[]
    OR?: SlideScalarWhereWithAggregatesInput[]
    NOT?: SlideScalarWhereWithAggregatesInput | SlideScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Slide"> | string
    presentationId?: StringWithAggregatesFilter<"Slide"> | string
    order?: IntWithAggregatesFilter<"Slide"> | number
    title?: StringWithAggregatesFilter<"Slide"> | string
    content?: JsonNullableWithAggregatesFilter<"Slide">
    background?: JsonNullableWithAggregatesFilter<"Slide">
    transitions?: JsonNullableWithAggregatesFilter<"Slide">
    createdAt?: DateTimeWithAggregatesFilter<"Slide"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Slide"> | Date | string
  }

  export type ElementWhereInput = {
    AND?: ElementWhereInput | ElementWhereInput[]
    OR?: ElementWhereInput[]
    NOT?: ElementWhereInput | ElementWhereInput[]
    id?: StringFilter<"Element"> | string
    slideId?: StringFilter<"Element"> | string
    type?: EnumElementTypeFilter<"Element"> | $Enums.ElementType
    content?: JsonFilter<"Element">
    zIndex?: IntFilter<"Element"> | number
    locked?: BoolFilter<"Element"> | boolean
    visible?: BoolFilter<"Element"> | boolean
    createdAt?: DateTimeFilter<"Element"> | Date | string
    updatedAt?: DateTimeFilter<"Element"> | Date | string
    slide?: XOR<SlideScalarRelationFilter, SlideWhereInput>
  }

  export type ElementOrderByWithRelationInput = {
    id?: SortOrder
    slideId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    zIndex?: SortOrder
    locked?: SortOrder
    visible?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slide?: SlideOrderByWithRelationInput
  }

  export type ElementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ElementWhereInput | ElementWhereInput[]
    OR?: ElementWhereInput[]
    NOT?: ElementWhereInput | ElementWhereInput[]
    slideId?: StringFilter<"Element"> | string
    type?: EnumElementTypeFilter<"Element"> | $Enums.ElementType
    content?: JsonFilter<"Element">
    zIndex?: IntFilter<"Element"> | number
    locked?: BoolFilter<"Element"> | boolean
    visible?: BoolFilter<"Element"> | boolean
    createdAt?: DateTimeFilter<"Element"> | Date | string
    updatedAt?: DateTimeFilter<"Element"> | Date | string
    slide?: XOR<SlideScalarRelationFilter, SlideWhereInput>
  }, "id">

  export type ElementOrderByWithAggregationInput = {
    id?: SortOrder
    slideId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    zIndex?: SortOrder
    locked?: SortOrder
    visible?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ElementCountOrderByAggregateInput
    _avg?: ElementAvgOrderByAggregateInput
    _max?: ElementMaxOrderByAggregateInput
    _min?: ElementMinOrderByAggregateInput
    _sum?: ElementSumOrderByAggregateInput
  }

  export type ElementScalarWhereWithAggregatesInput = {
    AND?: ElementScalarWhereWithAggregatesInput | ElementScalarWhereWithAggregatesInput[]
    OR?: ElementScalarWhereWithAggregatesInput[]
    NOT?: ElementScalarWhereWithAggregatesInput | ElementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Element"> | string
    slideId?: StringWithAggregatesFilter<"Element"> | string
    type?: EnumElementTypeWithAggregatesFilter<"Element"> | $Enums.ElementType
    content?: JsonWithAggregatesFilter<"Element">
    zIndex?: IntWithAggregatesFilter<"Element"> | number
    locked?: BoolWithAggregatesFilter<"Element"> | boolean
    visible?: BoolWithAggregatesFilter<"Element"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Element"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Element"> | Date | string
  }

  export type TemplateWhereInput = {
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    id?: StringFilter<"Template"> | string
    name?: StringFilter<"Template"> | string
    description?: StringNullableFilter<"Template"> | string | null
    category?: StringFilter<"Template"> | string
    thumbnail?: StringFilter<"Template"> | string
    data?: JsonFilter<"Template">
    tags?: StringNullableListFilter<"Template">
    isPublic?: BoolFilter<"Template"> | boolean
    downloads?: IntFilter<"Template"> | number
    rating?: FloatFilter<"Template"> | number
    createdBy?: StringFilter<"Template"> | string
    createdAt?: DateTimeFilter<"Template"> | Date | string
    updatedAt?: DateTimeFilter<"Template"> | Date | string
  }

  export type TemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    thumbnail?: SortOrder
    data?: SortOrder
    tags?: SortOrder
    isPublic?: SortOrder
    downloads?: SortOrder
    rating?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    name?: StringFilter<"Template"> | string
    description?: StringNullableFilter<"Template"> | string | null
    category?: StringFilter<"Template"> | string
    thumbnail?: StringFilter<"Template"> | string
    data?: JsonFilter<"Template">
    tags?: StringNullableListFilter<"Template">
    isPublic?: BoolFilter<"Template"> | boolean
    downloads?: IntFilter<"Template"> | number
    rating?: FloatFilter<"Template"> | number
    createdBy?: StringFilter<"Template"> | string
    createdAt?: DateTimeFilter<"Template"> | Date | string
    updatedAt?: DateTimeFilter<"Template"> | Date | string
  }, "id">

  export type TemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    thumbnail?: SortOrder
    data?: SortOrder
    tags?: SortOrder
    isPublic?: SortOrder
    downloads?: SortOrder
    rating?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TemplateCountOrderByAggregateInput
    _avg?: TemplateAvgOrderByAggregateInput
    _max?: TemplateMaxOrderByAggregateInput
    _min?: TemplateMinOrderByAggregateInput
    _sum?: TemplateSumOrderByAggregateInput
  }

  export type TemplateScalarWhereWithAggregatesInput = {
    AND?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    OR?: TemplateScalarWhereWithAggregatesInput[]
    NOT?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Template"> | string
    name?: StringWithAggregatesFilter<"Template"> | string
    description?: StringNullableWithAggregatesFilter<"Template"> | string | null
    category?: StringWithAggregatesFilter<"Template"> | string
    thumbnail?: StringWithAggregatesFilter<"Template"> | string
    data?: JsonWithAggregatesFilter<"Template">
    tags?: StringNullableListFilter<"Template">
    isPublic?: BoolWithAggregatesFilter<"Template"> | boolean
    downloads?: IntWithAggregatesFilter<"Template"> | number
    rating?: FloatWithAggregatesFilter<"Template"> | number
    createdBy?: StringWithAggregatesFilter<"Template"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Template"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Template"> | Date | string
  }

  export type CollaborationWhereInput = {
    AND?: CollaborationWhereInput | CollaborationWhereInput[]
    OR?: CollaborationWhereInput[]
    NOT?: CollaborationWhereInput | CollaborationWhereInput[]
    id?: StringFilter<"Collaboration"> | string
    presentationId?: StringFilter<"Collaboration"> | string
    userId?: StringFilter<"Collaboration"> | string
    role?: EnumCollaborationRoleFilter<"Collaboration"> | $Enums.CollaborationRole
    permissions?: JsonFilter<"Collaboration">
    joinedAt?: DateTimeFilter<"Collaboration"> | Date | string
    lastActiveAt?: DateTimeNullableFilter<"Collaboration"> | Date | string | null
    createdAt?: DateTimeFilter<"Collaboration"> | Date | string
    updatedAt?: DateTimeFilter<"Collaboration"> | Date | string
  }

  export type CollaborationOrderByWithRelationInput = {
    id?: SortOrder
    presentationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    permissions?: SortOrder
    joinedAt?: SortOrder
    lastActiveAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollaborationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CollaborationWhereInput | CollaborationWhereInput[]
    OR?: CollaborationWhereInput[]
    NOT?: CollaborationWhereInput | CollaborationWhereInput[]
    presentationId?: StringFilter<"Collaboration"> | string
    userId?: StringFilter<"Collaboration"> | string
    role?: EnumCollaborationRoleFilter<"Collaboration"> | $Enums.CollaborationRole
    permissions?: JsonFilter<"Collaboration">
    joinedAt?: DateTimeFilter<"Collaboration"> | Date | string
    lastActiveAt?: DateTimeNullableFilter<"Collaboration"> | Date | string | null
    createdAt?: DateTimeFilter<"Collaboration"> | Date | string
    updatedAt?: DateTimeFilter<"Collaboration"> | Date | string
  }, "id">

  export type CollaborationOrderByWithAggregationInput = {
    id?: SortOrder
    presentationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    permissions?: SortOrder
    joinedAt?: SortOrder
    lastActiveAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CollaborationCountOrderByAggregateInput
    _max?: CollaborationMaxOrderByAggregateInput
    _min?: CollaborationMinOrderByAggregateInput
  }

  export type CollaborationScalarWhereWithAggregatesInput = {
    AND?: CollaborationScalarWhereWithAggregatesInput | CollaborationScalarWhereWithAggregatesInput[]
    OR?: CollaborationScalarWhereWithAggregatesInput[]
    NOT?: CollaborationScalarWhereWithAggregatesInput | CollaborationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Collaboration"> | string
    presentationId?: StringWithAggregatesFilter<"Collaboration"> | string
    userId?: StringWithAggregatesFilter<"Collaboration"> | string
    role?: EnumCollaborationRoleWithAggregatesFilter<"Collaboration"> | $Enums.CollaborationRole
    permissions?: JsonWithAggregatesFilter<"Collaboration">
    joinedAt?: DateTimeWithAggregatesFilter<"Collaboration"> | Date | string
    lastActiveAt?: DateTimeNullableWithAggregatesFilter<"Collaboration"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Collaboration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Collaboration"> | Date | string
  }

  export type PresenceWhereInput = {
    AND?: PresenceWhereInput | PresenceWhereInput[]
    OR?: PresenceWhereInput[]
    NOT?: PresenceWhereInput | PresenceWhereInput[]
    id?: StringFilter<"Presence"> | string
    userId?: StringFilter<"Presence"> | string
    presentationId?: StringNullableFilter<"Presence"> | string | null
    socketId?: StringFilter<"Presence"> | string
    cursor?: JsonNullableFilter<"Presence">
    status?: EnumUserStatusFilter<"Presence"> | $Enums.UserStatus
    lastSeen?: DateTimeFilter<"Presence"> | Date | string
    createdAt?: DateTimeFilter<"Presence"> | Date | string
    updatedAt?: DateTimeFilter<"Presence"> | Date | string
  }

  export type PresenceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    presentationId?: SortOrderInput | SortOrder
    socketId?: SortOrder
    cursor?: SortOrderInput | SortOrder
    status?: SortOrder
    lastSeen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PresenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PresenceWhereInput | PresenceWhereInput[]
    OR?: PresenceWhereInput[]
    NOT?: PresenceWhereInput | PresenceWhereInput[]
    userId?: StringFilter<"Presence"> | string
    presentationId?: StringNullableFilter<"Presence"> | string | null
    socketId?: StringFilter<"Presence"> | string
    cursor?: JsonNullableFilter<"Presence">
    status?: EnumUserStatusFilter<"Presence"> | $Enums.UserStatus
    lastSeen?: DateTimeFilter<"Presence"> | Date | string
    createdAt?: DateTimeFilter<"Presence"> | Date | string
    updatedAt?: DateTimeFilter<"Presence"> | Date | string
  }, "id">

  export type PresenceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    presentationId?: SortOrderInput | SortOrder
    socketId?: SortOrder
    cursor?: SortOrderInput | SortOrder
    status?: SortOrder
    lastSeen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PresenceCountOrderByAggregateInput
    _max?: PresenceMaxOrderByAggregateInput
    _min?: PresenceMinOrderByAggregateInput
  }

  export type PresenceScalarWhereWithAggregatesInput = {
    AND?: PresenceScalarWhereWithAggregatesInput | PresenceScalarWhereWithAggregatesInput[]
    OR?: PresenceScalarWhereWithAggregatesInput[]
    NOT?: PresenceScalarWhereWithAggregatesInput | PresenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Presence"> | string
    userId?: StringWithAggregatesFilter<"Presence"> | string
    presentationId?: StringNullableWithAggregatesFilter<"Presence"> | string | null
    socketId?: StringWithAggregatesFilter<"Presence"> | string
    cursor?: JsonNullableWithAggregatesFilter<"Presence">
    status?: EnumUserStatusWithAggregatesFilter<"Presence"> | $Enums.UserStatus
    lastSeen?: DateTimeWithAggregatesFilter<"Presence"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Presence"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Presence"> | Date | string
  }

  export type StorageFileWhereInput = {
    AND?: StorageFileWhereInput | StorageFileWhereInput[]
    OR?: StorageFileWhereInput[]
    NOT?: StorageFileWhereInput | StorageFileWhereInput[]
    id?: StringFilter<"StorageFile"> | string
    originalName?: StringFilter<"StorageFile"> | string
    filename?: StringFilter<"StorageFile"> | string
    mimeType?: StringFilter<"StorageFile"> | string
    size?: IntFilter<"StorageFile"> | number
    url?: StringFilter<"StorageFile"> | string
    key?: StringFilter<"StorageFile"> | string
    bucket?: StringFilter<"StorageFile"> | string
    region?: StringFilter<"StorageFile"> | string
    uploadedBy?: StringFilter<"StorageFile"> | string
    isPublic?: BoolFilter<"StorageFile"> | boolean
    downloads?: IntFilter<"StorageFile"> | number
    createdAt?: DateTimeFilter<"StorageFile"> | Date | string
    updatedAt?: DateTimeFilter<"StorageFile"> | Date | string
    entry?: StringFilter<"StorageFile"> | string
  }

  export type StorageFileOrderByWithRelationInput = {
    id?: SortOrder
    originalName?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    url?: SortOrder
    key?: SortOrder
    bucket?: SortOrder
    region?: SortOrder
    uploadedBy?: SortOrder
    isPublic?: SortOrder
    downloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entry?: SortOrder
  }

  export type StorageFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StorageFileWhereInput | StorageFileWhereInput[]
    OR?: StorageFileWhereInput[]
    NOT?: StorageFileWhereInput | StorageFileWhereInput[]
    originalName?: StringFilter<"StorageFile"> | string
    filename?: StringFilter<"StorageFile"> | string
    mimeType?: StringFilter<"StorageFile"> | string
    size?: IntFilter<"StorageFile"> | number
    url?: StringFilter<"StorageFile"> | string
    key?: StringFilter<"StorageFile"> | string
    bucket?: StringFilter<"StorageFile"> | string
    region?: StringFilter<"StorageFile"> | string
    uploadedBy?: StringFilter<"StorageFile"> | string
    isPublic?: BoolFilter<"StorageFile"> | boolean
    downloads?: IntFilter<"StorageFile"> | number
    createdAt?: DateTimeFilter<"StorageFile"> | Date | string
    updatedAt?: DateTimeFilter<"StorageFile"> | Date | string
    entry?: StringFilter<"StorageFile"> | string
  }, "id">

  export type StorageFileOrderByWithAggregationInput = {
    id?: SortOrder
    originalName?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    url?: SortOrder
    key?: SortOrder
    bucket?: SortOrder
    region?: SortOrder
    uploadedBy?: SortOrder
    isPublic?: SortOrder
    downloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entry?: SortOrder
    _count?: StorageFileCountOrderByAggregateInput
    _avg?: StorageFileAvgOrderByAggregateInput
    _max?: StorageFileMaxOrderByAggregateInput
    _min?: StorageFileMinOrderByAggregateInput
    _sum?: StorageFileSumOrderByAggregateInput
  }

  export type StorageFileScalarWhereWithAggregatesInput = {
    AND?: StorageFileScalarWhereWithAggregatesInput | StorageFileScalarWhereWithAggregatesInput[]
    OR?: StorageFileScalarWhereWithAggregatesInput[]
    NOT?: StorageFileScalarWhereWithAggregatesInput | StorageFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StorageFile"> | string
    originalName?: StringWithAggregatesFilter<"StorageFile"> | string
    filename?: StringWithAggregatesFilter<"StorageFile"> | string
    mimeType?: StringWithAggregatesFilter<"StorageFile"> | string
    size?: IntWithAggregatesFilter<"StorageFile"> | number
    url?: StringWithAggregatesFilter<"StorageFile"> | string
    key?: StringWithAggregatesFilter<"StorageFile"> | string
    bucket?: StringWithAggregatesFilter<"StorageFile"> | string
    region?: StringWithAggregatesFilter<"StorageFile"> | string
    uploadedBy?: StringWithAggregatesFilter<"StorageFile"> | string
    isPublic?: BoolWithAggregatesFilter<"StorageFile"> | boolean
    downloads?: IntWithAggregatesFilter<"StorageFile"> | number
    createdAt?: DateTimeWithAggregatesFilter<"StorageFile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StorageFile"> | Date | string
    entry?: StringWithAggregatesFilter<"StorageFile"> | string
  }

  export type AIGenerationWhereInput = {
    AND?: AIGenerationWhereInput | AIGenerationWhereInput[]
    OR?: AIGenerationWhereInput[]
    NOT?: AIGenerationWhereInput | AIGenerationWhereInput[]
    id?: StringFilter<"AIGeneration"> | string
    userId?: StringNullableFilter<"AIGeneration"> | string | null
    prompt?: StringFilter<"AIGeneration"> | string
    model?: StringFilter<"AIGeneration"> | string
    response?: JsonFilter<"AIGeneration">
    tokens?: IntFilter<"AIGeneration"> | number
    cost?: FloatFilter<"AIGeneration"> | number
    latency?: IntFilter<"AIGeneration"> | number
    status?: EnumGenerationStatusFilter<"AIGeneration"> | $Enums.GenerationStatus
    createdAt?: DateTimeFilter<"AIGeneration"> | Date | string
    updatedAt?: DateTimeFilter<"AIGeneration"> | Date | string
  }

  export type AIGenerationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    prompt?: SortOrder
    model?: SortOrder
    response?: SortOrder
    tokens?: SortOrder
    cost?: SortOrder
    latency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIGenerationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIGenerationWhereInput | AIGenerationWhereInput[]
    OR?: AIGenerationWhereInput[]
    NOT?: AIGenerationWhereInput | AIGenerationWhereInput[]
    userId?: StringNullableFilter<"AIGeneration"> | string | null
    prompt?: StringFilter<"AIGeneration"> | string
    model?: StringFilter<"AIGeneration"> | string
    response?: JsonFilter<"AIGeneration">
    tokens?: IntFilter<"AIGeneration"> | number
    cost?: FloatFilter<"AIGeneration"> | number
    latency?: IntFilter<"AIGeneration"> | number
    status?: EnumGenerationStatusFilter<"AIGeneration"> | $Enums.GenerationStatus
    createdAt?: DateTimeFilter<"AIGeneration"> | Date | string
    updatedAt?: DateTimeFilter<"AIGeneration"> | Date | string
  }, "id">

  export type AIGenerationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    prompt?: SortOrder
    model?: SortOrder
    response?: SortOrder
    tokens?: SortOrder
    cost?: SortOrder
    latency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIGenerationCountOrderByAggregateInput
    _avg?: AIGenerationAvgOrderByAggregateInput
    _max?: AIGenerationMaxOrderByAggregateInput
    _min?: AIGenerationMinOrderByAggregateInput
    _sum?: AIGenerationSumOrderByAggregateInput
  }

  export type AIGenerationScalarWhereWithAggregatesInput = {
    AND?: AIGenerationScalarWhereWithAggregatesInput | AIGenerationScalarWhereWithAggregatesInput[]
    OR?: AIGenerationScalarWhereWithAggregatesInput[]
    NOT?: AIGenerationScalarWhereWithAggregatesInput | AIGenerationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIGeneration"> | string
    userId?: StringNullableWithAggregatesFilter<"AIGeneration"> | string | null
    prompt?: StringWithAggregatesFilter<"AIGeneration"> | string
    model?: StringWithAggregatesFilter<"AIGeneration"> | string
    response?: JsonWithAggregatesFilter<"AIGeneration">
    tokens?: IntWithAggregatesFilter<"AIGeneration"> | number
    cost?: FloatWithAggregatesFilter<"AIGeneration"> | number
    latency?: IntWithAggregatesFilter<"AIGeneration"> | number
    status?: EnumGenerationStatusWithAggregatesFilter<"AIGeneration"> | $Enums.GenerationStatus
    createdAt?: DateTimeWithAggregatesFilter<"AIGeneration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIGeneration"> | Date | string
  }

  export type QueueJobWhereInput = {
    AND?: QueueJobWhereInput | QueueJobWhereInput[]
    OR?: QueueJobWhereInput[]
    NOT?: QueueJobWhereInput | QueueJobWhereInput[]
    id?: StringFilter<"QueueJob"> | string
    type?: EnumJobTypeFilter<"QueueJob"> | $Enums.JobType
    data?: JsonFilter<"QueueJob">
    priority?: EnumJobPriorityFilter<"QueueJob"> | $Enums.JobPriority
    status?: EnumJobStatusFilter<"QueueJob"> | $Enums.JobStatus
    attempts?: IntFilter<"QueueJob"> | number
    maxAttempts?: IntFilter<"QueueJob"> | number
    scheduledAt?: DateTimeFilter<"QueueJob"> | Date | string
    startedAt?: DateTimeNullableFilter<"QueueJob"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"QueueJob"> | Date | string | null
    failedAt?: DateTimeNullableFilter<"QueueJob"> | Date | string | null
    createdAt?: DateTimeFilter<"QueueJob"> | Date | string
    updatedAt?: DateTimeFilter<"QueueJob"> | Date | string
  }

  export type QueueJobOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    data?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    failedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QueueJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QueueJobWhereInput | QueueJobWhereInput[]
    OR?: QueueJobWhereInput[]
    NOT?: QueueJobWhereInput | QueueJobWhereInput[]
    type?: EnumJobTypeFilter<"QueueJob"> | $Enums.JobType
    data?: JsonFilter<"QueueJob">
    priority?: EnumJobPriorityFilter<"QueueJob"> | $Enums.JobPriority
    status?: EnumJobStatusFilter<"QueueJob"> | $Enums.JobStatus
    attempts?: IntFilter<"QueueJob"> | number
    maxAttempts?: IntFilter<"QueueJob"> | number
    scheduledAt?: DateTimeFilter<"QueueJob"> | Date | string
    startedAt?: DateTimeNullableFilter<"QueueJob"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"QueueJob"> | Date | string | null
    failedAt?: DateTimeNullableFilter<"QueueJob"> | Date | string | null
    createdAt?: DateTimeFilter<"QueueJob"> | Date | string
    updatedAt?: DateTimeFilter<"QueueJob"> | Date | string
  }, "id">

  export type QueueJobOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    data?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    failedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QueueJobCountOrderByAggregateInput
    _avg?: QueueJobAvgOrderByAggregateInput
    _max?: QueueJobMaxOrderByAggregateInput
    _min?: QueueJobMinOrderByAggregateInput
    _sum?: QueueJobSumOrderByAggregateInput
  }

  export type QueueJobScalarWhereWithAggregatesInput = {
    AND?: QueueJobScalarWhereWithAggregatesInput | QueueJobScalarWhereWithAggregatesInput[]
    OR?: QueueJobScalarWhereWithAggregatesInput[]
    NOT?: QueueJobScalarWhereWithAggregatesInput | QueueJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QueueJob"> | string
    type?: EnumJobTypeWithAggregatesFilter<"QueueJob"> | $Enums.JobType
    data?: JsonWithAggregatesFilter<"QueueJob">
    priority?: EnumJobPriorityWithAggregatesFilter<"QueueJob"> | $Enums.JobPriority
    status?: EnumJobStatusWithAggregatesFilter<"QueueJob"> | $Enums.JobStatus
    attempts?: IntWithAggregatesFilter<"QueueJob"> | number
    maxAttempts?: IntWithAggregatesFilter<"QueueJob"> | number
    scheduledAt?: DateTimeWithAggregatesFilter<"QueueJob"> | Date | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"QueueJob"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"QueueJob"> | Date | string | null
    failedAt?: DateTimeNullableWithAggregatesFilter<"QueueJob"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QueueJob"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QueueJob"> | Date | string
  }

  export type SearchIndexWhereInput = {
    AND?: SearchIndexWhereInput | SearchIndexWhereInput[]
    OR?: SearchIndexWhereInput[]
    NOT?: SearchIndexWhereInput | SearchIndexWhereInput[]
    id?: StringFilter<"SearchIndex"> | string
    entityType?: StringFilter<"SearchIndex"> | string
    entityId?: StringFilter<"SearchIndex"> | string
    content?: JsonFilter<"SearchIndex">
    keywords?: StringNullableListFilter<"SearchIndex">
    weight?: FloatFilter<"SearchIndex"> | number
    indexedAt?: DateTimeFilter<"SearchIndex"> | Date | string
    updatedAt?: DateTimeFilter<"SearchIndex"> | Date | string
  }

  export type SearchIndexOrderByWithRelationInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    content?: SortOrder
    keywords?: SortOrder
    weight?: SortOrder
    indexedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchIndexWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SearchIndexWhereInput | SearchIndexWhereInput[]
    OR?: SearchIndexWhereInput[]
    NOT?: SearchIndexWhereInput | SearchIndexWhereInput[]
    entityType?: StringFilter<"SearchIndex"> | string
    entityId?: StringFilter<"SearchIndex"> | string
    content?: JsonFilter<"SearchIndex">
    keywords?: StringNullableListFilter<"SearchIndex">
    weight?: FloatFilter<"SearchIndex"> | number
    indexedAt?: DateTimeFilter<"SearchIndex"> | Date | string
    updatedAt?: DateTimeFilter<"SearchIndex"> | Date | string
  }, "id">

  export type SearchIndexOrderByWithAggregationInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    content?: SortOrder
    keywords?: SortOrder
    weight?: SortOrder
    indexedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SearchIndexCountOrderByAggregateInput
    _avg?: SearchIndexAvgOrderByAggregateInput
    _max?: SearchIndexMaxOrderByAggregateInput
    _min?: SearchIndexMinOrderByAggregateInput
    _sum?: SearchIndexSumOrderByAggregateInput
  }

  export type SearchIndexScalarWhereWithAggregatesInput = {
    AND?: SearchIndexScalarWhereWithAggregatesInput | SearchIndexScalarWhereWithAggregatesInput[]
    OR?: SearchIndexScalarWhereWithAggregatesInput[]
    NOT?: SearchIndexScalarWhereWithAggregatesInput | SearchIndexScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SearchIndex"> | string
    entityType?: StringWithAggregatesFilter<"SearchIndex"> | string
    entityId?: StringWithAggregatesFilter<"SearchIndex"> | string
    content?: JsonWithAggregatesFilter<"SearchIndex">
    keywords?: StringNullableListFilter<"SearchIndex">
    weight?: FloatWithAggregatesFilter<"SearchIndex"> | number
    indexedAt?: DateTimeWithAggregatesFilter<"SearchIndex"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SearchIndex"> | Date | string
  }

  export type AnalyticsWhereInput = {
    AND?: AnalyticsWhereInput | AnalyticsWhereInput[]
    OR?: AnalyticsWhereInput[]
    NOT?: AnalyticsWhereInput | AnalyticsWhereInput[]
    id?: StringFilter<"Analytics"> | string
    userId?: StringNullableFilter<"Analytics"> | string | null
    event?: EnumAnalyticsEventFilter<"Analytics"> | $Enums.AnalyticsEvent
    properties?: JsonFilter<"Analytics">
    value?: FloatNullableFilter<"Analytics"> | number | null
    timestamp?: DateTimeFilter<"Analytics"> | Date | string
    createdAt?: DateTimeFilter<"Analytics"> | Date | string
  }

  export type AnalyticsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    event?: SortOrder
    properties?: SortOrder
    value?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnalyticsWhereInput | AnalyticsWhereInput[]
    OR?: AnalyticsWhereInput[]
    NOT?: AnalyticsWhereInput | AnalyticsWhereInput[]
    userId?: StringNullableFilter<"Analytics"> | string | null
    event?: EnumAnalyticsEventFilter<"Analytics"> | $Enums.AnalyticsEvent
    properties?: JsonFilter<"Analytics">
    value?: FloatNullableFilter<"Analytics"> | number | null
    timestamp?: DateTimeFilter<"Analytics"> | Date | string
    createdAt?: DateTimeFilter<"Analytics"> | Date | string
  }, "id">

  export type AnalyticsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    event?: SortOrder
    properties?: SortOrder
    value?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    _count?: AnalyticsCountOrderByAggregateInput
    _avg?: AnalyticsAvgOrderByAggregateInput
    _max?: AnalyticsMaxOrderByAggregateInput
    _min?: AnalyticsMinOrderByAggregateInput
    _sum?: AnalyticsSumOrderByAggregateInput
  }

  export type AnalyticsScalarWhereWithAggregatesInput = {
    AND?: AnalyticsScalarWhereWithAggregatesInput | AnalyticsScalarWhereWithAggregatesInput[]
    OR?: AnalyticsScalarWhereWithAggregatesInput[]
    NOT?: AnalyticsScalarWhereWithAggregatesInput | AnalyticsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Analytics"> | string
    userId?: StringNullableWithAggregatesFilter<"Analytics"> | string | null
    event?: EnumAnalyticsEventWithAggregatesFilter<"Analytics"> | $Enums.AnalyticsEvent
    properties?: JsonWithAggregatesFilter<"Analytics">
    value?: FloatNullableWithAggregatesFilter<"Analytics"> | number | null
    timestamp?: DateTimeWithAggregatesFilter<"Analytics"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Analytics"> | Date | string
  }

  export type ExportWhereInput = {
    AND?: ExportWhereInput | ExportWhereInput[]
    OR?: ExportWhereInput[]
    NOT?: ExportWhereInput | ExportWhereInput[]
    id?: StringFilter<"Export"> | string
    presentationId?: StringFilter<"Export"> | string
    format?: StringFilter<"Export"> | string
    options?: JsonFilter<"Export">
    fileSize?: IntFilter<"Export"> | number
    downloadUrl?: StringFilter<"Export"> | string
    expiresAt?: DateTimeFilter<"Export"> | Date | string
    processingTime?: IntFilter<"Export"> | number
    status?: EnumExportStatusFilter<"Export"> | $Enums.ExportStatus
    createdAt?: DateTimeFilter<"Export"> | Date | string
    updatedAt?: DateTimeFilter<"Export"> | Date | string
    presentation?: XOR<PresentationScalarRelationFilter, PresentationWhereInput>
  }

  export type ExportOrderByWithRelationInput = {
    id?: SortOrder
    presentationId?: SortOrder
    format?: SortOrder
    options?: SortOrder
    fileSize?: SortOrder
    downloadUrl?: SortOrder
    expiresAt?: SortOrder
    processingTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    presentation?: PresentationOrderByWithRelationInput
  }

  export type ExportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExportWhereInput | ExportWhereInput[]
    OR?: ExportWhereInput[]
    NOT?: ExportWhereInput | ExportWhereInput[]
    presentationId?: StringFilter<"Export"> | string
    format?: StringFilter<"Export"> | string
    options?: JsonFilter<"Export">
    fileSize?: IntFilter<"Export"> | number
    downloadUrl?: StringFilter<"Export"> | string
    expiresAt?: DateTimeFilter<"Export"> | Date | string
    processingTime?: IntFilter<"Export"> | number
    status?: EnumExportStatusFilter<"Export"> | $Enums.ExportStatus
    createdAt?: DateTimeFilter<"Export"> | Date | string
    updatedAt?: DateTimeFilter<"Export"> | Date | string
    presentation?: XOR<PresentationScalarRelationFilter, PresentationWhereInput>
  }, "id">

  export type ExportOrderByWithAggregationInput = {
    id?: SortOrder
    presentationId?: SortOrder
    format?: SortOrder
    options?: SortOrder
    fileSize?: SortOrder
    downloadUrl?: SortOrder
    expiresAt?: SortOrder
    processingTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExportCountOrderByAggregateInput
    _avg?: ExportAvgOrderByAggregateInput
    _max?: ExportMaxOrderByAggregateInput
    _min?: ExportMinOrderByAggregateInput
    _sum?: ExportSumOrderByAggregateInput
  }

  export type ExportScalarWhereWithAggregatesInput = {
    AND?: ExportScalarWhereWithAggregatesInput | ExportScalarWhereWithAggregatesInput[]
    OR?: ExportScalarWhereWithAggregatesInput[]
    NOT?: ExportScalarWhereWithAggregatesInput | ExportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Export"> | string
    presentationId?: StringWithAggregatesFilter<"Export"> | string
    format?: StringWithAggregatesFilter<"Export"> | string
    options?: JsonWithAggregatesFilter<"Export">
    fileSize?: IntWithAggregatesFilter<"Export"> | number
    downloadUrl?: StringWithAggregatesFilter<"Export"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Export"> | Date | string
    processingTime?: IntWithAggregatesFilter<"Export"> | number
    status?: EnumExportStatusWithAggregatesFilter<"Export"> | $Enums.ExportStatus
    createdAt?: DateTimeWithAggregatesFilter<"Export"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Export"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    userId: string
    type: $Enums.AccountType
    provider: string
    providerAccountId?: string | null
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.AccountType
    provider: string
    providerAccountId?: string | null
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.AccountType
    provider: string
    providerAccountId?: string | null
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresentationCreateInput = {
    id?: string
    title: string
    description?: string | null
    userId: string
    templateId?: string | null
    status?: $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    slides?: SlideCreateNestedManyWithoutPresentationInput
    exports?: ExportCreateNestedManyWithoutPresentationInput
  }

  export type PresentationUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    userId: string
    templateId?: string | null
    status?: $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    slides?: SlideUncheckedCreateNestedManyWithoutPresentationInput
    exports?: ExportUncheckedCreateNestedManyWithoutPresentationInput
  }

  export type PresentationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPresentationStatusFieldUpdateOperationsInput | $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slides?: SlideUpdateManyWithoutPresentationNestedInput
    exports?: ExportUpdateManyWithoutPresentationNestedInput
  }

  export type PresentationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPresentationStatusFieldUpdateOperationsInput | $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slides?: SlideUncheckedUpdateManyWithoutPresentationNestedInput
    exports?: ExportUncheckedUpdateManyWithoutPresentationNestedInput
  }

  export type PresentationCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    userId: string
    templateId?: string | null
    status?: $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PresentationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPresentationStatusFieldUpdateOperationsInput | $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresentationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPresentationStatusFieldUpdateOperationsInput | $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlideCreateInput = {
    id?: string
    order: number
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    presentation: PresentationCreateNestedOneWithoutSlidesInput
    elements?: ElementCreateNestedManyWithoutSlideInput
  }

  export type SlideUncheckedCreateInput = {
    id?: string
    presentationId: string
    order: number
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    elements?: ElementUncheckedCreateNestedManyWithoutSlideInput
  }

  export type SlideUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presentation?: PresentationUpdateOneRequiredWithoutSlidesNestedInput
    elements?: ElementUpdateManyWithoutSlideNestedInput
  }

  export type SlideUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    presentationId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    elements?: ElementUncheckedUpdateManyWithoutSlideNestedInput
  }

  export type SlideCreateManyInput = {
    id?: string
    presentationId: string
    order: number
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SlideUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlideUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    presentationId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementCreateInput = {
    id?: string
    type: $Enums.ElementType
    content: JsonNullValueInput | InputJsonValue
    zIndex?: number
    locked?: boolean
    visible?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slide: SlideCreateNestedOneWithoutElementsInput
  }

  export type ElementUncheckedCreateInput = {
    id?: string
    slideId: string
    type: $Enums.ElementType
    content: JsonNullValueInput | InputJsonValue
    zIndex?: number
    locked?: boolean
    visible?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumElementTypeFieldUpdateOperationsInput | $Enums.ElementType
    content?: JsonNullValueInput | InputJsonValue
    zIndex?: IntFieldUpdateOperationsInput | number
    locked?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slide?: SlideUpdateOneRequiredWithoutElementsNestedInput
  }

  export type ElementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slideId?: StringFieldUpdateOperationsInput | string
    type?: EnumElementTypeFieldUpdateOperationsInput | $Enums.ElementType
    content?: JsonNullValueInput | InputJsonValue
    zIndex?: IntFieldUpdateOperationsInput | number
    locked?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementCreateManyInput = {
    id?: string
    slideId: string
    type: $Enums.ElementType
    content: JsonNullValueInput | InputJsonValue
    zIndex?: number
    locked?: boolean
    visible?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumElementTypeFieldUpdateOperationsInput | $Enums.ElementType
    content?: JsonNullValueInput | InputJsonValue
    zIndex?: IntFieldUpdateOperationsInput | number
    locked?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slideId?: StringFieldUpdateOperationsInput | string
    type?: EnumElementTypeFieldUpdateOperationsInput | $Enums.ElementType
    content?: JsonNullValueInput | InputJsonValue
    zIndex?: IntFieldUpdateOperationsInput | number
    locked?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateCreateInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    thumbnail: string
    data: JsonNullValueInput | InputJsonValue
    tags?: TemplateCreatetagsInput | string[]
    isPublic?: boolean
    downloads?: number
    rating?: number
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    thumbnail: string
    data: JsonNullValueInput | InputJsonValue
    tags?: TemplateCreatetagsInput | string[]
    isPublic?: boolean
    downloads?: number
    rating?: number
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    tags?: TemplateUpdatetagsInput | string[]
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    downloads?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    tags?: TemplateUpdatetagsInput | string[]
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    downloads?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    thumbnail: string
    data: JsonNullValueInput | InputJsonValue
    tags?: TemplateCreatetagsInput | string[]
    isPublic?: boolean
    downloads?: number
    rating?: number
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    tags?: TemplateUpdatetagsInput | string[]
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    downloads?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    tags?: TemplateUpdatetagsInput | string[]
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    downloads?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollaborationCreateInput = {
    id?: string
    presentationId: string
    userId: string
    role?: $Enums.CollaborationRole
    permissions: JsonNullValueInput | InputJsonValue
    joinedAt?: Date | string
    lastActiveAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CollaborationUncheckedCreateInput = {
    id?: string
    presentationId: string
    userId: string
    role?: $Enums.CollaborationRole
    permissions: JsonNullValueInput | InputJsonValue
    joinedAt?: Date | string
    lastActiveAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CollaborationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    presentationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCollaborationRoleFieldUpdateOperationsInput | $Enums.CollaborationRole
    permissions?: JsonNullValueInput | InputJsonValue
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollaborationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    presentationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCollaborationRoleFieldUpdateOperationsInput | $Enums.CollaborationRole
    permissions?: JsonNullValueInput | InputJsonValue
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollaborationCreateManyInput = {
    id?: string
    presentationId: string
    userId: string
    role?: $Enums.CollaborationRole
    permissions: JsonNullValueInput | InputJsonValue
    joinedAt?: Date | string
    lastActiveAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CollaborationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    presentationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCollaborationRoleFieldUpdateOperationsInput | $Enums.CollaborationRole
    permissions?: JsonNullValueInput | InputJsonValue
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollaborationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    presentationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCollaborationRoleFieldUpdateOperationsInput | $Enums.CollaborationRole
    permissions?: JsonNullValueInput | InputJsonValue
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresenceCreateInput = {
    id?: string
    userId: string
    presentationId?: string | null
    socketId: string
    cursor?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.UserStatus
    lastSeen?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PresenceUncheckedCreateInput = {
    id?: string
    userId: string
    presentationId?: string | null
    socketId: string
    cursor?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.UserStatus
    lastSeen?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PresenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    presentationId?: NullableStringFieldUpdateOperationsInput | string | null
    socketId?: StringFieldUpdateOperationsInput | string
    cursor?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    presentationId?: NullableStringFieldUpdateOperationsInput | string | null
    socketId?: StringFieldUpdateOperationsInput | string
    cursor?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresenceCreateManyInput = {
    id?: string
    userId: string
    presentationId?: string | null
    socketId: string
    cursor?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.UserStatus
    lastSeen?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PresenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    presentationId?: NullableStringFieldUpdateOperationsInput | string | null
    socketId?: StringFieldUpdateOperationsInput | string
    cursor?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    presentationId?: NullableStringFieldUpdateOperationsInput | string | null
    socketId?: StringFieldUpdateOperationsInput | string
    cursor?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorageFileCreateInput = {
    id?: string
    originalName: string
    filename: string
    mimeType: string
    size: number
    url: string
    key: string
    bucket: string
    region: string
    uploadedBy: string
    isPublic?: boolean
    downloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    entry?: string
  }

  export type StorageFileUncheckedCreateInput = {
    id?: string
    originalName: string
    filename: string
    mimeType: string
    size: number
    url: string
    key: string
    bucket: string
    region: string
    uploadedBy: string
    isPublic?: boolean
    downloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    entry?: string
  }

  export type StorageFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    downloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: StringFieldUpdateOperationsInput | string
  }

  export type StorageFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    downloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: StringFieldUpdateOperationsInput | string
  }

  export type StorageFileCreateManyInput = {
    id?: string
    originalName: string
    filename: string
    mimeType: string
    size: number
    url: string
    key: string
    bucket: string
    region: string
    uploadedBy: string
    isPublic?: boolean
    downloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    entry?: string
  }

  export type StorageFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    downloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: StringFieldUpdateOperationsInput | string
  }

  export type StorageFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    downloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: StringFieldUpdateOperationsInput | string
  }

  export type AIGenerationCreateInput = {
    id?: string
    userId?: string | null
    prompt: string
    model: string
    response: JsonNullValueInput | InputJsonValue
    tokens: number
    cost: number
    latency: number
    status?: $Enums.GenerationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIGenerationUncheckedCreateInput = {
    id?: string
    userId?: string | null
    prompt: string
    model: string
    response: JsonNullValueInput | InputJsonValue
    tokens: number
    cost: number
    latency: number
    status?: $Enums.GenerationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIGenerationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    response?: JsonNullValueInput | InputJsonValue
    tokens?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    status?: EnumGenerationStatusFieldUpdateOperationsInput | $Enums.GenerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIGenerationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    response?: JsonNullValueInput | InputJsonValue
    tokens?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    status?: EnumGenerationStatusFieldUpdateOperationsInput | $Enums.GenerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIGenerationCreateManyInput = {
    id?: string
    userId?: string | null
    prompt: string
    model: string
    response: JsonNullValueInput | InputJsonValue
    tokens: number
    cost: number
    latency: number
    status?: $Enums.GenerationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIGenerationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    response?: JsonNullValueInput | InputJsonValue
    tokens?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    status?: EnumGenerationStatusFieldUpdateOperationsInput | $Enums.GenerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIGenerationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    response?: JsonNullValueInput | InputJsonValue
    tokens?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    status?: EnumGenerationStatusFieldUpdateOperationsInput | $Enums.GenerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueJobCreateInput = {
    id?: string
    type: $Enums.JobType
    data: JsonNullValueInput | InputJsonValue
    priority?: $Enums.JobPriority
    status?: $Enums.JobStatus
    attempts?: number
    maxAttempts?: number
    scheduledAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QueueJobUncheckedCreateInput = {
    id?: string
    type: $Enums.JobType
    data: JsonNullValueInput | InputJsonValue
    priority?: $Enums.JobPriority
    status?: $Enums.JobStatus
    attempts?: number
    maxAttempts?: number
    scheduledAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QueueJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    data?: JsonNullValueInput | InputJsonValue
    priority?: EnumJobPriorityFieldUpdateOperationsInput | $Enums.JobPriority
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    data?: JsonNullValueInput | InputJsonValue
    priority?: EnumJobPriorityFieldUpdateOperationsInput | $Enums.JobPriority
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueJobCreateManyInput = {
    id?: string
    type: $Enums.JobType
    data: JsonNullValueInput | InputJsonValue
    priority?: $Enums.JobPriority
    status?: $Enums.JobStatus
    attempts?: number
    maxAttempts?: number
    scheduledAt?: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QueueJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    data?: JsonNullValueInput | InputJsonValue
    priority?: EnumJobPriorityFieldUpdateOperationsInput | $Enums.JobPriority
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    data?: JsonNullValueInput | InputJsonValue
    priority?: EnumJobPriorityFieldUpdateOperationsInput | $Enums.JobPriority
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchIndexCreateInput = {
    id?: string
    entityType: string
    entityId: string
    content: JsonNullValueInput | InputJsonValue
    keywords?: SearchIndexCreatekeywordsInput | string[]
    weight?: number
    indexedAt?: Date | string
    updatedAt?: Date | string
  }

  export type SearchIndexUncheckedCreateInput = {
    id?: string
    entityType: string
    entityId: string
    content: JsonNullValueInput | InputJsonValue
    keywords?: SearchIndexCreatekeywordsInput | string[]
    weight?: number
    indexedAt?: Date | string
    updatedAt?: Date | string
  }

  export type SearchIndexUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    keywords?: SearchIndexUpdatekeywordsInput | string[]
    weight?: FloatFieldUpdateOperationsInput | number
    indexedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchIndexUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    keywords?: SearchIndexUpdatekeywordsInput | string[]
    weight?: FloatFieldUpdateOperationsInput | number
    indexedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchIndexCreateManyInput = {
    id?: string
    entityType: string
    entityId: string
    content: JsonNullValueInput | InputJsonValue
    keywords?: SearchIndexCreatekeywordsInput | string[]
    weight?: number
    indexedAt?: Date | string
    updatedAt?: Date | string
  }

  export type SearchIndexUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    keywords?: SearchIndexUpdatekeywordsInput | string[]
    weight?: FloatFieldUpdateOperationsInput | number
    indexedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchIndexUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    keywords?: SearchIndexUpdatekeywordsInput | string[]
    weight?: FloatFieldUpdateOperationsInput | number
    indexedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsCreateInput = {
    id?: string
    userId?: string | null
    event: $Enums.AnalyticsEvent
    properties: JsonNullValueInput | InputJsonValue
    value?: number | null
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type AnalyticsUncheckedCreateInput = {
    id?: string
    userId?: string | null
    event: $Enums.AnalyticsEvent
    properties: JsonNullValueInput | InputJsonValue
    value?: number | null
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type AnalyticsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    event?: EnumAnalyticsEventFieldUpdateOperationsInput | $Enums.AnalyticsEvent
    properties?: JsonNullValueInput | InputJsonValue
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    event?: EnumAnalyticsEventFieldUpdateOperationsInput | $Enums.AnalyticsEvent
    properties?: JsonNullValueInput | InputJsonValue
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsCreateManyInput = {
    id?: string
    userId?: string | null
    event: $Enums.AnalyticsEvent
    properties: JsonNullValueInput | InputJsonValue
    value?: number | null
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type AnalyticsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    event?: EnumAnalyticsEventFieldUpdateOperationsInput | $Enums.AnalyticsEvent
    properties?: JsonNullValueInput | InputJsonValue
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    event?: EnumAnalyticsEventFieldUpdateOperationsInput | $Enums.AnalyticsEvent
    properties?: JsonNullValueInput | InputJsonValue
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExportCreateInput = {
    id?: string
    format: string
    options: JsonNullValueInput | InputJsonValue
    fileSize: number
    downloadUrl: string
    expiresAt: Date | string
    processingTime: number
    status?: $Enums.ExportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    presentation: PresentationCreateNestedOneWithoutExportsInput
  }

  export type ExportUncheckedCreateInput = {
    id?: string
    presentationId: string
    format: string
    options: JsonNullValueInput | InputJsonValue
    fileSize: number
    downloadUrl: string
    expiresAt: Date | string
    processingTime: number
    status?: $Enums.ExportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    options?: JsonNullValueInput | InputJsonValue
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadUrl?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumExportStatusFieldUpdateOperationsInput | $Enums.ExportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presentation?: PresentationUpdateOneRequiredWithoutExportsNestedInput
  }

  export type ExportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    presentationId?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    options?: JsonNullValueInput | InputJsonValue
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadUrl?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumExportStatusFieldUpdateOperationsInput | $Enums.ExportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExportCreateManyInput = {
    id?: string
    presentationId: string
    format: string
    options: JsonNullValueInput | InputJsonValue
    fileSize: number
    downloadUrl: string
    expiresAt: Date | string
    processingTime: number
    status?: $Enums.ExportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    options?: JsonNullValueInput | InputJsonValue
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadUrl?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumExportStatusFieldUpdateOperationsInput | $Enums.ExportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    presentationId?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    options?: JsonNullValueInput | InputJsonValue
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadUrl?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumExportStatusFieldUpdateOperationsInput | $Enums.ExportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumPresentationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PresentationStatus | EnumPresentationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PresentationStatus[] | ListEnumPresentationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PresentationStatus[] | ListEnumPresentationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPresentationStatusFilter<$PrismaModel> | $Enums.PresentationStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SlideListRelationFilter = {
    every?: SlideWhereInput
    some?: SlideWhereInput
    none?: SlideWhereInput
  }

  export type ExportListRelationFilter = {
    every?: ExportWhereInput
    some?: ExportWhereInput
    none?: ExportWhereInput
  }

  export type SlideOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PresentationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    templateId?: SortOrder
    status?: SortOrder
    data?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PresentationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    templateId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PresentationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    templateId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPresentationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PresentationStatus | EnumPresentationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PresentationStatus[] | ListEnumPresentationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PresentationStatus[] | ListEnumPresentationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPresentationStatusWithAggregatesFilter<$PrismaModel> | $Enums.PresentationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPresentationStatusFilter<$PrismaModel>
    _max?: NestedEnumPresentationStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PresentationScalarRelationFilter = {
    is?: PresentationWhereInput
    isNot?: PresentationWhereInput
  }

  export type ElementListRelationFilter = {
    every?: ElementWhereInput
    some?: ElementWhereInput
    none?: ElementWhereInput
  }

  export type ElementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SlideCountOrderByAggregateInput = {
    id?: SortOrder
    presentationId?: SortOrder
    order?: SortOrder
    title?: SortOrder
    content?: SortOrder
    background?: SortOrder
    transitions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SlideAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type SlideMaxOrderByAggregateInput = {
    id?: SortOrder
    presentationId?: SortOrder
    order?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SlideMinOrderByAggregateInput = {
    id?: SortOrder
    presentationId?: SortOrder
    order?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SlideSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumElementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ElementType | EnumElementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ElementType[] | ListEnumElementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ElementType[] | ListEnumElementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumElementTypeFilter<$PrismaModel> | $Enums.ElementType
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SlideScalarRelationFilter = {
    is?: SlideWhereInput
    isNot?: SlideWhereInput
  }

  export type ElementCountOrderByAggregateInput = {
    id?: SortOrder
    slideId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    zIndex?: SortOrder
    locked?: SortOrder
    visible?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ElementAvgOrderByAggregateInput = {
    zIndex?: SortOrder
  }

  export type ElementMaxOrderByAggregateInput = {
    id?: SortOrder
    slideId?: SortOrder
    type?: SortOrder
    zIndex?: SortOrder
    locked?: SortOrder
    visible?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ElementMinOrderByAggregateInput = {
    id?: SortOrder
    slideId?: SortOrder
    type?: SortOrder
    zIndex?: SortOrder
    locked?: SortOrder
    visible?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ElementSumOrderByAggregateInput = {
    zIndex?: SortOrder
  }

  export type EnumElementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ElementType | EnumElementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ElementType[] | ListEnumElementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ElementType[] | ListEnumElementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumElementTypeWithAggregatesFilter<$PrismaModel> | $Enums.ElementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumElementTypeFilter<$PrismaModel>
    _max?: NestedEnumElementTypeFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    thumbnail?: SortOrder
    data?: SortOrder
    tags?: SortOrder
    isPublic?: SortOrder
    downloads?: SortOrder
    rating?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateAvgOrderByAggregateInput = {
    downloads?: SortOrder
    rating?: SortOrder
  }

  export type TemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    thumbnail?: SortOrder
    isPublic?: SortOrder
    downloads?: SortOrder
    rating?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    thumbnail?: SortOrder
    isPublic?: SortOrder
    downloads?: SortOrder
    rating?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateSumOrderByAggregateInput = {
    downloads?: SortOrder
    rating?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumCollaborationRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.CollaborationRole | EnumCollaborationRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CollaborationRole[] | ListEnumCollaborationRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CollaborationRole[] | ListEnumCollaborationRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCollaborationRoleFilter<$PrismaModel> | $Enums.CollaborationRole
  }

  export type CollaborationCountOrderByAggregateInput = {
    id?: SortOrder
    presentationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    permissions?: SortOrder
    joinedAt?: SortOrder
    lastActiveAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollaborationMaxOrderByAggregateInput = {
    id?: SortOrder
    presentationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    lastActiveAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollaborationMinOrderByAggregateInput = {
    id?: SortOrder
    presentationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    lastActiveAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumCollaborationRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CollaborationRole | EnumCollaborationRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CollaborationRole[] | ListEnumCollaborationRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CollaborationRole[] | ListEnumCollaborationRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCollaborationRoleWithAggregatesFilter<$PrismaModel> | $Enums.CollaborationRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCollaborationRoleFilter<$PrismaModel>
    _max?: NestedEnumCollaborationRoleFilter<$PrismaModel>
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type PresenceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presentationId?: SortOrder
    socketId?: SortOrder
    cursor?: SortOrder
    status?: SortOrder
    lastSeen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PresenceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presentationId?: SortOrder
    socketId?: SortOrder
    status?: SortOrder
    lastSeen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PresenceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presentationId?: SortOrder
    socketId?: SortOrder
    status?: SortOrder
    lastSeen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type StorageFileCountOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    url?: SortOrder
    key?: SortOrder
    bucket?: SortOrder
    region?: SortOrder
    uploadedBy?: SortOrder
    isPublic?: SortOrder
    downloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entry?: SortOrder
  }

  export type StorageFileAvgOrderByAggregateInput = {
    size?: SortOrder
    downloads?: SortOrder
  }

  export type StorageFileMaxOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    url?: SortOrder
    key?: SortOrder
    bucket?: SortOrder
    region?: SortOrder
    uploadedBy?: SortOrder
    isPublic?: SortOrder
    downloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entry?: SortOrder
  }

  export type StorageFileMinOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    url?: SortOrder
    key?: SortOrder
    bucket?: SortOrder
    region?: SortOrder
    uploadedBy?: SortOrder
    isPublic?: SortOrder
    downloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entry?: SortOrder
  }

  export type StorageFileSumOrderByAggregateInput = {
    size?: SortOrder
    downloads?: SortOrder
  }

  export type EnumGenerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GenerationStatus | EnumGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGenerationStatusFilter<$PrismaModel> | $Enums.GenerationStatus
  }

  export type AIGenerationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    prompt?: SortOrder
    model?: SortOrder
    response?: SortOrder
    tokens?: SortOrder
    cost?: SortOrder
    latency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIGenerationAvgOrderByAggregateInput = {
    tokens?: SortOrder
    cost?: SortOrder
    latency?: SortOrder
  }

  export type AIGenerationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    prompt?: SortOrder
    model?: SortOrder
    tokens?: SortOrder
    cost?: SortOrder
    latency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIGenerationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    prompt?: SortOrder
    model?: SortOrder
    tokens?: SortOrder
    cost?: SortOrder
    latency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIGenerationSumOrderByAggregateInput = {
    tokens?: SortOrder
    cost?: SortOrder
    latency?: SortOrder
  }

  export type EnumGenerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GenerationStatus | EnumGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGenerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.GenerationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenerationStatusFilter<$PrismaModel>
    _max?: NestedEnumGenerationStatusFilter<$PrismaModel>
  }

  export type EnumJobTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeFilter<$PrismaModel> | $Enums.JobType
  }

  export type EnumJobPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.JobPriority | EnumJobPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.JobPriority[] | ListEnumJobPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobPriority[] | ListEnumJobPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumJobPriorityFilter<$PrismaModel> | $Enums.JobPriority
  }

  export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type QueueJobCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    data?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    failedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QueueJobAvgOrderByAggregateInput = {
    attempts?: SortOrder
    maxAttempts?: SortOrder
  }

  export type QueueJobMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    failedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QueueJobMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    failedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QueueJobSumOrderByAggregateInput = {
    attempts?: SortOrder
    maxAttempts?: SortOrder
  }

  export type EnumJobTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeWithAggregatesFilter<$PrismaModel> | $Enums.JobType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobTypeFilter<$PrismaModel>
    _max?: NestedEnumJobTypeFilter<$PrismaModel>
  }

  export type EnumJobPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobPriority | EnumJobPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.JobPriority[] | ListEnumJobPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobPriority[] | ListEnumJobPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumJobPriorityWithAggregatesFilter<$PrismaModel> | $Enums.JobPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobPriorityFilter<$PrismaModel>
    _max?: NestedEnumJobPriorityFilter<$PrismaModel>
  }

  export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type SearchIndexCountOrderByAggregateInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    content?: SortOrder
    keywords?: SortOrder
    weight?: SortOrder
    indexedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchIndexAvgOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type SearchIndexMaxOrderByAggregateInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    weight?: SortOrder
    indexedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchIndexMinOrderByAggregateInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    weight?: SortOrder
    indexedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchIndexSumOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type EnumAnalyticsEventFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalyticsEvent | EnumAnalyticsEventFieldRefInput<$PrismaModel>
    in?: $Enums.AnalyticsEvent[] | ListEnumAnalyticsEventFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalyticsEvent[] | ListEnumAnalyticsEventFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalyticsEventFilter<$PrismaModel> | $Enums.AnalyticsEvent
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AnalyticsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    event?: SortOrder
    properties?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type AnalyticsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    event?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    event?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type EnumAnalyticsEventWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalyticsEvent | EnumAnalyticsEventFieldRefInput<$PrismaModel>
    in?: $Enums.AnalyticsEvent[] | ListEnumAnalyticsEventFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalyticsEvent[] | ListEnumAnalyticsEventFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalyticsEventWithAggregatesFilter<$PrismaModel> | $Enums.AnalyticsEvent
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnalyticsEventFilter<$PrismaModel>
    _max?: NestedEnumAnalyticsEventFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumExportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportStatus | EnumExportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExportStatus[] | ListEnumExportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportStatus[] | ListEnumExportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExportStatusFilter<$PrismaModel> | $Enums.ExportStatus
  }

  export type ExportCountOrderByAggregateInput = {
    id?: SortOrder
    presentationId?: SortOrder
    format?: SortOrder
    options?: SortOrder
    fileSize?: SortOrder
    downloadUrl?: SortOrder
    expiresAt?: SortOrder
    processingTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExportAvgOrderByAggregateInput = {
    fileSize?: SortOrder
    processingTime?: SortOrder
  }

  export type ExportMaxOrderByAggregateInput = {
    id?: SortOrder
    presentationId?: SortOrder
    format?: SortOrder
    fileSize?: SortOrder
    downloadUrl?: SortOrder
    expiresAt?: SortOrder
    processingTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExportMinOrderByAggregateInput = {
    id?: SortOrder
    presentationId?: SortOrder
    format?: SortOrder
    fileSize?: SortOrder
    downloadUrl?: SortOrder
    expiresAt?: SortOrder
    processingTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExportSumOrderByAggregateInput = {
    fileSize?: SortOrder
    processingTime?: SortOrder
  }

  export type EnumExportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportStatus | EnumExportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExportStatus[] | ListEnumExportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportStatus[] | ListEnumExportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExportStatusFilter<$PrismaModel>
    _max?: NestedEnumExportStatusFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.AccountType
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SlideCreateNestedManyWithoutPresentationInput = {
    create?: XOR<SlideCreateWithoutPresentationInput, SlideUncheckedCreateWithoutPresentationInput> | SlideCreateWithoutPresentationInput[] | SlideUncheckedCreateWithoutPresentationInput[]
    connectOrCreate?: SlideCreateOrConnectWithoutPresentationInput | SlideCreateOrConnectWithoutPresentationInput[]
    createMany?: SlideCreateManyPresentationInputEnvelope
    connect?: SlideWhereUniqueInput | SlideWhereUniqueInput[]
  }

  export type ExportCreateNestedManyWithoutPresentationInput = {
    create?: XOR<ExportCreateWithoutPresentationInput, ExportUncheckedCreateWithoutPresentationInput> | ExportCreateWithoutPresentationInput[] | ExportUncheckedCreateWithoutPresentationInput[]
    connectOrCreate?: ExportCreateOrConnectWithoutPresentationInput | ExportCreateOrConnectWithoutPresentationInput[]
    createMany?: ExportCreateManyPresentationInputEnvelope
    connect?: ExportWhereUniqueInput | ExportWhereUniqueInput[]
  }

  export type SlideUncheckedCreateNestedManyWithoutPresentationInput = {
    create?: XOR<SlideCreateWithoutPresentationInput, SlideUncheckedCreateWithoutPresentationInput> | SlideCreateWithoutPresentationInput[] | SlideUncheckedCreateWithoutPresentationInput[]
    connectOrCreate?: SlideCreateOrConnectWithoutPresentationInput | SlideCreateOrConnectWithoutPresentationInput[]
    createMany?: SlideCreateManyPresentationInputEnvelope
    connect?: SlideWhereUniqueInput | SlideWhereUniqueInput[]
  }

  export type ExportUncheckedCreateNestedManyWithoutPresentationInput = {
    create?: XOR<ExportCreateWithoutPresentationInput, ExportUncheckedCreateWithoutPresentationInput> | ExportCreateWithoutPresentationInput[] | ExportUncheckedCreateWithoutPresentationInput[]
    connectOrCreate?: ExportCreateOrConnectWithoutPresentationInput | ExportCreateOrConnectWithoutPresentationInput[]
    createMany?: ExportCreateManyPresentationInputEnvelope
    connect?: ExportWhereUniqueInput | ExportWhereUniqueInput[]
  }

  export type EnumPresentationStatusFieldUpdateOperationsInput = {
    set?: $Enums.PresentationStatus
  }

  export type SlideUpdateManyWithoutPresentationNestedInput = {
    create?: XOR<SlideCreateWithoutPresentationInput, SlideUncheckedCreateWithoutPresentationInput> | SlideCreateWithoutPresentationInput[] | SlideUncheckedCreateWithoutPresentationInput[]
    connectOrCreate?: SlideCreateOrConnectWithoutPresentationInput | SlideCreateOrConnectWithoutPresentationInput[]
    upsert?: SlideUpsertWithWhereUniqueWithoutPresentationInput | SlideUpsertWithWhereUniqueWithoutPresentationInput[]
    createMany?: SlideCreateManyPresentationInputEnvelope
    set?: SlideWhereUniqueInput | SlideWhereUniqueInput[]
    disconnect?: SlideWhereUniqueInput | SlideWhereUniqueInput[]
    delete?: SlideWhereUniqueInput | SlideWhereUniqueInput[]
    connect?: SlideWhereUniqueInput | SlideWhereUniqueInput[]
    update?: SlideUpdateWithWhereUniqueWithoutPresentationInput | SlideUpdateWithWhereUniqueWithoutPresentationInput[]
    updateMany?: SlideUpdateManyWithWhereWithoutPresentationInput | SlideUpdateManyWithWhereWithoutPresentationInput[]
    deleteMany?: SlideScalarWhereInput | SlideScalarWhereInput[]
  }

  export type ExportUpdateManyWithoutPresentationNestedInput = {
    create?: XOR<ExportCreateWithoutPresentationInput, ExportUncheckedCreateWithoutPresentationInput> | ExportCreateWithoutPresentationInput[] | ExportUncheckedCreateWithoutPresentationInput[]
    connectOrCreate?: ExportCreateOrConnectWithoutPresentationInput | ExportCreateOrConnectWithoutPresentationInput[]
    upsert?: ExportUpsertWithWhereUniqueWithoutPresentationInput | ExportUpsertWithWhereUniqueWithoutPresentationInput[]
    createMany?: ExportCreateManyPresentationInputEnvelope
    set?: ExportWhereUniqueInput | ExportWhereUniqueInput[]
    disconnect?: ExportWhereUniqueInput | ExportWhereUniqueInput[]
    delete?: ExportWhereUniqueInput | ExportWhereUniqueInput[]
    connect?: ExportWhereUniqueInput | ExportWhereUniqueInput[]
    update?: ExportUpdateWithWhereUniqueWithoutPresentationInput | ExportUpdateWithWhereUniqueWithoutPresentationInput[]
    updateMany?: ExportUpdateManyWithWhereWithoutPresentationInput | ExportUpdateManyWithWhereWithoutPresentationInput[]
    deleteMany?: ExportScalarWhereInput | ExportScalarWhereInput[]
  }

  export type SlideUncheckedUpdateManyWithoutPresentationNestedInput = {
    create?: XOR<SlideCreateWithoutPresentationInput, SlideUncheckedCreateWithoutPresentationInput> | SlideCreateWithoutPresentationInput[] | SlideUncheckedCreateWithoutPresentationInput[]
    connectOrCreate?: SlideCreateOrConnectWithoutPresentationInput | SlideCreateOrConnectWithoutPresentationInput[]
    upsert?: SlideUpsertWithWhereUniqueWithoutPresentationInput | SlideUpsertWithWhereUniqueWithoutPresentationInput[]
    createMany?: SlideCreateManyPresentationInputEnvelope
    set?: SlideWhereUniqueInput | SlideWhereUniqueInput[]
    disconnect?: SlideWhereUniqueInput | SlideWhereUniqueInput[]
    delete?: SlideWhereUniqueInput | SlideWhereUniqueInput[]
    connect?: SlideWhereUniqueInput | SlideWhereUniqueInput[]
    update?: SlideUpdateWithWhereUniqueWithoutPresentationInput | SlideUpdateWithWhereUniqueWithoutPresentationInput[]
    updateMany?: SlideUpdateManyWithWhereWithoutPresentationInput | SlideUpdateManyWithWhereWithoutPresentationInput[]
    deleteMany?: SlideScalarWhereInput | SlideScalarWhereInput[]
  }

  export type ExportUncheckedUpdateManyWithoutPresentationNestedInput = {
    create?: XOR<ExportCreateWithoutPresentationInput, ExportUncheckedCreateWithoutPresentationInput> | ExportCreateWithoutPresentationInput[] | ExportUncheckedCreateWithoutPresentationInput[]
    connectOrCreate?: ExportCreateOrConnectWithoutPresentationInput | ExportCreateOrConnectWithoutPresentationInput[]
    upsert?: ExportUpsertWithWhereUniqueWithoutPresentationInput | ExportUpsertWithWhereUniqueWithoutPresentationInput[]
    createMany?: ExportCreateManyPresentationInputEnvelope
    set?: ExportWhereUniqueInput | ExportWhereUniqueInput[]
    disconnect?: ExportWhereUniqueInput | ExportWhereUniqueInput[]
    delete?: ExportWhereUniqueInput | ExportWhereUniqueInput[]
    connect?: ExportWhereUniqueInput | ExportWhereUniqueInput[]
    update?: ExportUpdateWithWhereUniqueWithoutPresentationInput | ExportUpdateWithWhereUniqueWithoutPresentationInput[]
    updateMany?: ExportUpdateManyWithWhereWithoutPresentationInput | ExportUpdateManyWithWhereWithoutPresentationInput[]
    deleteMany?: ExportScalarWhereInput | ExportScalarWhereInput[]
  }

  export type PresentationCreateNestedOneWithoutSlidesInput = {
    create?: XOR<PresentationCreateWithoutSlidesInput, PresentationUncheckedCreateWithoutSlidesInput>
    connectOrCreate?: PresentationCreateOrConnectWithoutSlidesInput
    connect?: PresentationWhereUniqueInput
  }

  export type ElementCreateNestedManyWithoutSlideInput = {
    create?: XOR<ElementCreateWithoutSlideInput, ElementUncheckedCreateWithoutSlideInput> | ElementCreateWithoutSlideInput[] | ElementUncheckedCreateWithoutSlideInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutSlideInput | ElementCreateOrConnectWithoutSlideInput[]
    createMany?: ElementCreateManySlideInputEnvelope
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
  }

  export type ElementUncheckedCreateNestedManyWithoutSlideInput = {
    create?: XOR<ElementCreateWithoutSlideInput, ElementUncheckedCreateWithoutSlideInput> | ElementCreateWithoutSlideInput[] | ElementUncheckedCreateWithoutSlideInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutSlideInput | ElementCreateOrConnectWithoutSlideInput[]
    createMany?: ElementCreateManySlideInputEnvelope
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PresentationUpdateOneRequiredWithoutSlidesNestedInput = {
    create?: XOR<PresentationCreateWithoutSlidesInput, PresentationUncheckedCreateWithoutSlidesInput>
    connectOrCreate?: PresentationCreateOrConnectWithoutSlidesInput
    upsert?: PresentationUpsertWithoutSlidesInput
    connect?: PresentationWhereUniqueInput
    update?: XOR<XOR<PresentationUpdateToOneWithWhereWithoutSlidesInput, PresentationUpdateWithoutSlidesInput>, PresentationUncheckedUpdateWithoutSlidesInput>
  }

  export type ElementUpdateManyWithoutSlideNestedInput = {
    create?: XOR<ElementCreateWithoutSlideInput, ElementUncheckedCreateWithoutSlideInput> | ElementCreateWithoutSlideInput[] | ElementUncheckedCreateWithoutSlideInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutSlideInput | ElementCreateOrConnectWithoutSlideInput[]
    upsert?: ElementUpsertWithWhereUniqueWithoutSlideInput | ElementUpsertWithWhereUniqueWithoutSlideInput[]
    createMany?: ElementCreateManySlideInputEnvelope
    set?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    disconnect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    delete?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    update?: ElementUpdateWithWhereUniqueWithoutSlideInput | ElementUpdateWithWhereUniqueWithoutSlideInput[]
    updateMany?: ElementUpdateManyWithWhereWithoutSlideInput | ElementUpdateManyWithWhereWithoutSlideInput[]
    deleteMany?: ElementScalarWhereInput | ElementScalarWhereInput[]
  }

  export type ElementUncheckedUpdateManyWithoutSlideNestedInput = {
    create?: XOR<ElementCreateWithoutSlideInput, ElementUncheckedCreateWithoutSlideInput> | ElementCreateWithoutSlideInput[] | ElementUncheckedCreateWithoutSlideInput[]
    connectOrCreate?: ElementCreateOrConnectWithoutSlideInput | ElementCreateOrConnectWithoutSlideInput[]
    upsert?: ElementUpsertWithWhereUniqueWithoutSlideInput | ElementUpsertWithWhereUniqueWithoutSlideInput[]
    createMany?: ElementCreateManySlideInputEnvelope
    set?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    disconnect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    delete?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    connect?: ElementWhereUniqueInput | ElementWhereUniqueInput[]
    update?: ElementUpdateWithWhereUniqueWithoutSlideInput | ElementUpdateWithWhereUniqueWithoutSlideInput[]
    updateMany?: ElementUpdateManyWithWhereWithoutSlideInput | ElementUpdateManyWithWhereWithoutSlideInput[]
    deleteMany?: ElementScalarWhereInput | ElementScalarWhereInput[]
  }

  export type SlideCreateNestedOneWithoutElementsInput = {
    create?: XOR<SlideCreateWithoutElementsInput, SlideUncheckedCreateWithoutElementsInput>
    connectOrCreate?: SlideCreateOrConnectWithoutElementsInput
    connect?: SlideWhereUniqueInput
  }

  export type EnumElementTypeFieldUpdateOperationsInput = {
    set?: $Enums.ElementType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type SlideUpdateOneRequiredWithoutElementsNestedInput = {
    create?: XOR<SlideCreateWithoutElementsInput, SlideUncheckedCreateWithoutElementsInput>
    connectOrCreate?: SlideCreateOrConnectWithoutElementsInput
    upsert?: SlideUpsertWithoutElementsInput
    connect?: SlideWhereUniqueInput
    update?: XOR<XOR<SlideUpdateToOneWithWhereWithoutElementsInput, SlideUpdateWithoutElementsInput>, SlideUncheckedUpdateWithoutElementsInput>
  }

  export type TemplateCreatetagsInput = {
    set: string[]
  }

  export type TemplateUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumCollaborationRoleFieldUpdateOperationsInput = {
    set?: $Enums.CollaborationRole
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type EnumGenerationStatusFieldUpdateOperationsInput = {
    set?: $Enums.GenerationStatus
  }

  export type EnumJobTypeFieldUpdateOperationsInput = {
    set?: $Enums.JobType
  }

  export type EnumJobPriorityFieldUpdateOperationsInput = {
    set?: $Enums.JobPriority
  }

  export type EnumJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.JobStatus
  }

  export type SearchIndexCreatekeywordsInput = {
    set: string[]
  }

  export type SearchIndexUpdatekeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumAnalyticsEventFieldUpdateOperationsInput = {
    set?: $Enums.AnalyticsEvent
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PresentationCreateNestedOneWithoutExportsInput = {
    create?: XOR<PresentationCreateWithoutExportsInput, PresentationUncheckedCreateWithoutExportsInput>
    connectOrCreate?: PresentationCreateOrConnectWithoutExportsInput
    connect?: PresentationWhereUniqueInput
  }

  export type EnumExportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExportStatus
  }

  export type PresentationUpdateOneRequiredWithoutExportsNestedInput = {
    create?: XOR<PresentationCreateWithoutExportsInput, PresentationUncheckedCreateWithoutExportsInput>
    connectOrCreate?: PresentationCreateOrConnectWithoutExportsInput
    upsert?: PresentationUpsertWithoutExportsInput
    connect?: PresentationWhereUniqueInput
    update?: XOR<XOR<PresentationUpdateToOneWithWhereWithoutExportsInput, PresentationUpdateWithoutExportsInput>, PresentationUncheckedUpdateWithoutExportsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumPresentationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PresentationStatus | EnumPresentationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PresentationStatus[] | ListEnumPresentationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PresentationStatus[] | ListEnumPresentationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPresentationStatusFilter<$PrismaModel> | $Enums.PresentationStatus
  }

  export type NestedEnumPresentationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PresentationStatus | EnumPresentationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PresentationStatus[] | ListEnumPresentationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PresentationStatus[] | ListEnumPresentationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPresentationStatusWithAggregatesFilter<$PrismaModel> | $Enums.PresentationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPresentationStatusFilter<$PrismaModel>
    _max?: NestedEnumPresentationStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumElementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ElementType | EnumElementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ElementType[] | ListEnumElementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ElementType[] | ListEnumElementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumElementTypeFilter<$PrismaModel> | $Enums.ElementType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumElementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ElementType | EnumElementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ElementType[] | ListEnumElementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ElementType[] | ListEnumElementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumElementTypeWithAggregatesFilter<$PrismaModel> | $Enums.ElementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumElementTypeFilter<$PrismaModel>
    _max?: NestedEnumElementTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumCollaborationRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.CollaborationRole | EnumCollaborationRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CollaborationRole[] | ListEnumCollaborationRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CollaborationRole[] | ListEnumCollaborationRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCollaborationRoleFilter<$PrismaModel> | $Enums.CollaborationRole
  }

  export type NestedEnumCollaborationRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CollaborationRole | EnumCollaborationRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CollaborationRole[] | ListEnumCollaborationRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CollaborationRole[] | ListEnumCollaborationRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCollaborationRoleWithAggregatesFilter<$PrismaModel> | $Enums.CollaborationRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCollaborationRoleFilter<$PrismaModel>
    _max?: NestedEnumCollaborationRoleFilter<$PrismaModel>
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedEnumGenerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GenerationStatus | EnumGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGenerationStatusFilter<$PrismaModel> | $Enums.GenerationStatus
  }

  export type NestedEnumGenerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GenerationStatus | EnumGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGenerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.GenerationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenerationStatusFilter<$PrismaModel>
    _max?: NestedEnumGenerationStatusFilter<$PrismaModel>
  }

  export type NestedEnumJobTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeFilter<$PrismaModel> | $Enums.JobType
  }

  export type NestedEnumJobPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.JobPriority | EnumJobPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.JobPriority[] | ListEnumJobPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobPriority[] | ListEnumJobPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumJobPriorityFilter<$PrismaModel> | $Enums.JobPriority
  }

  export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type NestedEnumJobTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeWithAggregatesFilter<$PrismaModel> | $Enums.JobType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobTypeFilter<$PrismaModel>
    _max?: NestedEnumJobTypeFilter<$PrismaModel>
  }

  export type NestedEnumJobPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobPriority | EnumJobPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.JobPriority[] | ListEnumJobPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobPriority[] | ListEnumJobPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumJobPriorityWithAggregatesFilter<$PrismaModel> | $Enums.JobPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobPriorityFilter<$PrismaModel>
    _max?: NestedEnumJobPriorityFilter<$PrismaModel>
  }

  export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type NestedEnumAnalyticsEventFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalyticsEvent | EnumAnalyticsEventFieldRefInput<$PrismaModel>
    in?: $Enums.AnalyticsEvent[] | ListEnumAnalyticsEventFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalyticsEvent[] | ListEnumAnalyticsEventFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalyticsEventFilter<$PrismaModel> | $Enums.AnalyticsEvent
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAnalyticsEventWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalyticsEvent | EnumAnalyticsEventFieldRefInput<$PrismaModel>
    in?: $Enums.AnalyticsEvent[] | ListEnumAnalyticsEventFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalyticsEvent[] | ListEnumAnalyticsEventFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalyticsEventWithAggregatesFilter<$PrismaModel> | $Enums.AnalyticsEvent
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnalyticsEventFilter<$PrismaModel>
    _max?: NestedEnumAnalyticsEventFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumExportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportStatus | EnumExportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExportStatus[] | ListEnumExportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportStatus[] | ListEnumExportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExportStatusFilter<$PrismaModel> | $Enums.ExportStatus
  }

  export type NestedEnumExportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportStatus | EnumExportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExportStatus[] | ListEnumExportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportStatus[] | ListEnumExportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExportStatusFilter<$PrismaModel>
    _max?: NestedEnumExportStatusFilter<$PrismaModel>
  }

  export type SlideCreateWithoutPresentationInput = {
    id?: string
    order: number
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    elements?: ElementCreateNestedManyWithoutSlideInput
  }

  export type SlideUncheckedCreateWithoutPresentationInput = {
    id?: string
    order: number
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    elements?: ElementUncheckedCreateNestedManyWithoutSlideInput
  }

  export type SlideCreateOrConnectWithoutPresentationInput = {
    where: SlideWhereUniqueInput
    create: XOR<SlideCreateWithoutPresentationInput, SlideUncheckedCreateWithoutPresentationInput>
  }

  export type SlideCreateManyPresentationInputEnvelope = {
    data: SlideCreateManyPresentationInput | SlideCreateManyPresentationInput[]
    skipDuplicates?: boolean
  }

  export type ExportCreateWithoutPresentationInput = {
    id?: string
    format: string
    options: JsonNullValueInput | InputJsonValue
    fileSize: number
    downloadUrl: string
    expiresAt: Date | string
    processingTime: number
    status?: $Enums.ExportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExportUncheckedCreateWithoutPresentationInput = {
    id?: string
    format: string
    options: JsonNullValueInput | InputJsonValue
    fileSize: number
    downloadUrl: string
    expiresAt: Date | string
    processingTime: number
    status?: $Enums.ExportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExportCreateOrConnectWithoutPresentationInput = {
    where: ExportWhereUniqueInput
    create: XOR<ExportCreateWithoutPresentationInput, ExportUncheckedCreateWithoutPresentationInput>
  }

  export type ExportCreateManyPresentationInputEnvelope = {
    data: ExportCreateManyPresentationInput | ExportCreateManyPresentationInput[]
    skipDuplicates?: boolean
  }

  export type SlideUpsertWithWhereUniqueWithoutPresentationInput = {
    where: SlideWhereUniqueInput
    update: XOR<SlideUpdateWithoutPresentationInput, SlideUncheckedUpdateWithoutPresentationInput>
    create: XOR<SlideCreateWithoutPresentationInput, SlideUncheckedCreateWithoutPresentationInput>
  }

  export type SlideUpdateWithWhereUniqueWithoutPresentationInput = {
    where: SlideWhereUniqueInput
    data: XOR<SlideUpdateWithoutPresentationInput, SlideUncheckedUpdateWithoutPresentationInput>
  }

  export type SlideUpdateManyWithWhereWithoutPresentationInput = {
    where: SlideScalarWhereInput
    data: XOR<SlideUpdateManyMutationInput, SlideUncheckedUpdateManyWithoutPresentationInput>
  }

  export type SlideScalarWhereInput = {
    AND?: SlideScalarWhereInput | SlideScalarWhereInput[]
    OR?: SlideScalarWhereInput[]
    NOT?: SlideScalarWhereInput | SlideScalarWhereInput[]
    id?: StringFilter<"Slide"> | string
    presentationId?: StringFilter<"Slide"> | string
    order?: IntFilter<"Slide"> | number
    title?: StringFilter<"Slide"> | string
    content?: JsonNullableFilter<"Slide">
    background?: JsonNullableFilter<"Slide">
    transitions?: JsonNullableFilter<"Slide">
    createdAt?: DateTimeFilter<"Slide"> | Date | string
    updatedAt?: DateTimeFilter<"Slide"> | Date | string
  }

  export type ExportUpsertWithWhereUniqueWithoutPresentationInput = {
    where: ExportWhereUniqueInput
    update: XOR<ExportUpdateWithoutPresentationInput, ExportUncheckedUpdateWithoutPresentationInput>
    create: XOR<ExportCreateWithoutPresentationInput, ExportUncheckedCreateWithoutPresentationInput>
  }

  export type ExportUpdateWithWhereUniqueWithoutPresentationInput = {
    where: ExportWhereUniqueInput
    data: XOR<ExportUpdateWithoutPresentationInput, ExportUncheckedUpdateWithoutPresentationInput>
  }

  export type ExportUpdateManyWithWhereWithoutPresentationInput = {
    where: ExportScalarWhereInput
    data: XOR<ExportUpdateManyMutationInput, ExportUncheckedUpdateManyWithoutPresentationInput>
  }

  export type ExportScalarWhereInput = {
    AND?: ExportScalarWhereInput | ExportScalarWhereInput[]
    OR?: ExportScalarWhereInput[]
    NOT?: ExportScalarWhereInput | ExportScalarWhereInput[]
    id?: StringFilter<"Export"> | string
    presentationId?: StringFilter<"Export"> | string
    format?: StringFilter<"Export"> | string
    options?: JsonFilter<"Export">
    fileSize?: IntFilter<"Export"> | number
    downloadUrl?: StringFilter<"Export"> | string
    expiresAt?: DateTimeFilter<"Export"> | Date | string
    processingTime?: IntFilter<"Export"> | number
    status?: EnumExportStatusFilter<"Export"> | $Enums.ExportStatus
    createdAt?: DateTimeFilter<"Export"> | Date | string
    updatedAt?: DateTimeFilter<"Export"> | Date | string
  }

  export type PresentationCreateWithoutSlidesInput = {
    id?: string
    title: string
    description?: string | null
    userId: string
    templateId?: string | null
    status?: $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    exports?: ExportCreateNestedManyWithoutPresentationInput
  }

  export type PresentationUncheckedCreateWithoutSlidesInput = {
    id?: string
    title: string
    description?: string | null
    userId: string
    templateId?: string | null
    status?: $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    exports?: ExportUncheckedCreateNestedManyWithoutPresentationInput
  }

  export type PresentationCreateOrConnectWithoutSlidesInput = {
    where: PresentationWhereUniqueInput
    create: XOR<PresentationCreateWithoutSlidesInput, PresentationUncheckedCreateWithoutSlidesInput>
  }

  export type ElementCreateWithoutSlideInput = {
    id?: string
    type: $Enums.ElementType
    content: JsonNullValueInput | InputJsonValue
    zIndex?: number
    locked?: boolean
    visible?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElementUncheckedCreateWithoutSlideInput = {
    id?: string
    type: $Enums.ElementType
    content: JsonNullValueInput | InputJsonValue
    zIndex?: number
    locked?: boolean
    visible?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElementCreateOrConnectWithoutSlideInput = {
    where: ElementWhereUniqueInput
    create: XOR<ElementCreateWithoutSlideInput, ElementUncheckedCreateWithoutSlideInput>
  }

  export type ElementCreateManySlideInputEnvelope = {
    data: ElementCreateManySlideInput | ElementCreateManySlideInput[]
    skipDuplicates?: boolean
  }

  export type PresentationUpsertWithoutSlidesInput = {
    update: XOR<PresentationUpdateWithoutSlidesInput, PresentationUncheckedUpdateWithoutSlidesInput>
    create: XOR<PresentationCreateWithoutSlidesInput, PresentationUncheckedCreateWithoutSlidesInput>
    where?: PresentationWhereInput
  }

  export type PresentationUpdateToOneWithWhereWithoutSlidesInput = {
    where?: PresentationWhereInput
    data: XOR<PresentationUpdateWithoutSlidesInput, PresentationUncheckedUpdateWithoutSlidesInput>
  }

  export type PresentationUpdateWithoutSlidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPresentationStatusFieldUpdateOperationsInput | $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exports?: ExportUpdateManyWithoutPresentationNestedInput
  }

  export type PresentationUncheckedUpdateWithoutSlidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPresentationStatusFieldUpdateOperationsInput | $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exports?: ExportUncheckedUpdateManyWithoutPresentationNestedInput
  }

  export type ElementUpsertWithWhereUniqueWithoutSlideInput = {
    where: ElementWhereUniqueInput
    update: XOR<ElementUpdateWithoutSlideInput, ElementUncheckedUpdateWithoutSlideInput>
    create: XOR<ElementCreateWithoutSlideInput, ElementUncheckedCreateWithoutSlideInput>
  }

  export type ElementUpdateWithWhereUniqueWithoutSlideInput = {
    where: ElementWhereUniqueInput
    data: XOR<ElementUpdateWithoutSlideInput, ElementUncheckedUpdateWithoutSlideInput>
  }

  export type ElementUpdateManyWithWhereWithoutSlideInput = {
    where: ElementScalarWhereInput
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyWithoutSlideInput>
  }

  export type ElementScalarWhereInput = {
    AND?: ElementScalarWhereInput | ElementScalarWhereInput[]
    OR?: ElementScalarWhereInput[]
    NOT?: ElementScalarWhereInput | ElementScalarWhereInput[]
    id?: StringFilter<"Element"> | string
    slideId?: StringFilter<"Element"> | string
    type?: EnumElementTypeFilter<"Element"> | $Enums.ElementType
    content?: JsonFilter<"Element">
    zIndex?: IntFilter<"Element"> | number
    locked?: BoolFilter<"Element"> | boolean
    visible?: BoolFilter<"Element"> | boolean
    createdAt?: DateTimeFilter<"Element"> | Date | string
    updatedAt?: DateTimeFilter<"Element"> | Date | string
  }

  export type SlideCreateWithoutElementsInput = {
    id?: string
    order: number
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    presentation: PresentationCreateNestedOneWithoutSlidesInput
  }

  export type SlideUncheckedCreateWithoutElementsInput = {
    id?: string
    presentationId: string
    order: number
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SlideCreateOrConnectWithoutElementsInput = {
    where: SlideWhereUniqueInput
    create: XOR<SlideCreateWithoutElementsInput, SlideUncheckedCreateWithoutElementsInput>
  }

  export type SlideUpsertWithoutElementsInput = {
    update: XOR<SlideUpdateWithoutElementsInput, SlideUncheckedUpdateWithoutElementsInput>
    create: XOR<SlideCreateWithoutElementsInput, SlideUncheckedCreateWithoutElementsInput>
    where?: SlideWhereInput
  }

  export type SlideUpdateToOneWithWhereWithoutElementsInput = {
    where?: SlideWhereInput
    data: XOR<SlideUpdateWithoutElementsInput, SlideUncheckedUpdateWithoutElementsInput>
  }

  export type SlideUpdateWithoutElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presentation?: PresentationUpdateOneRequiredWithoutSlidesNestedInput
  }

  export type SlideUncheckedUpdateWithoutElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    presentationId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresentationCreateWithoutExportsInput = {
    id?: string
    title: string
    description?: string | null
    userId: string
    templateId?: string | null
    status?: $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    slides?: SlideCreateNestedManyWithoutPresentationInput
  }

  export type PresentationUncheckedCreateWithoutExportsInput = {
    id?: string
    title: string
    description?: string | null
    userId: string
    templateId?: string | null
    status?: $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    slides?: SlideUncheckedCreateNestedManyWithoutPresentationInput
  }

  export type PresentationCreateOrConnectWithoutExportsInput = {
    where: PresentationWhereUniqueInput
    create: XOR<PresentationCreateWithoutExportsInput, PresentationUncheckedCreateWithoutExportsInput>
  }

  export type PresentationUpsertWithoutExportsInput = {
    update: XOR<PresentationUpdateWithoutExportsInput, PresentationUncheckedUpdateWithoutExportsInput>
    create: XOR<PresentationCreateWithoutExportsInput, PresentationUncheckedCreateWithoutExportsInput>
    where?: PresentationWhereInput
  }

  export type PresentationUpdateToOneWithWhereWithoutExportsInput = {
    where?: PresentationWhereInput
    data: XOR<PresentationUpdateWithoutExportsInput, PresentationUncheckedUpdateWithoutExportsInput>
  }

  export type PresentationUpdateWithoutExportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPresentationStatusFieldUpdateOperationsInput | $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slides?: SlideUpdateManyWithoutPresentationNestedInput
  }

  export type PresentationUncheckedUpdateWithoutExportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPresentationStatusFieldUpdateOperationsInput | $Enums.PresentationStatus
    data?: NullableJsonNullValueInput | InputJsonValue
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slides?: SlideUncheckedUpdateManyWithoutPresentationNestedInput
  }

  export type SlideCreateManyPresentationInput = {
    id?: string
    order: number
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExportCreateManyPresentationInput = {
    id?: string
    format: string
    options: JsonNullValueInput | InputJsonValue
    fileSize: number
    downloadUrl: string
    expiresAt: Date | string
    processingTime: number
    status?: $Enums.ExportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SlideUpdateWithoutPresentationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    elements?: ElementUpdateManyWithoutSlideNestedInput
  }

  export type SlideUncheckedUpdateWithoutPresentationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    elements?: ElementUncheckedUpdateManyWithoutSlideNestedInput
  }

  export type SlideUncheckedUpdateManyWithoutPresentationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    background?: NullableJsonNullValueInput | InputJsonValue
    transitions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExportUpdateWithoutPresentationInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    options?: JsonNullValueInput | InputJsonValue
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadUrl?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumExportStatusFieldUpdateOperationsInput | $Enums.ExportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExportUncheckedUpdateWithoutPresentationInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    options?: JsonNullValueInput | InputJsonValue
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadUrl?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumExportStatusFieldUpdateOperationsInput | $Enums.ExportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExportUncheckedUpdateManyWithoutPresentationInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    options?: JsonNullValueInput | InputJsonValue
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadUrl?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumExportStatusFieldUpdateOperationsInput | $Enums.ExportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementCreateManySlideInput = {
    id?: string
    type: $Enums.ElementType
    content: JsonNullValueInput | InputJsonValue
    zIndex?: number
    locked?: boolean
    visible?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElementUpdateWithoutSlideInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumElementTypeFieldUpdateOperationsInput | $Enums.ElementType
    content?: JsonNullValueInput | InputJsonValue
    zIndex?: IntFieldUpdateOperationsInput | number
    locked?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementUncheckedUpdateWithoutSlideInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumElementTypeFieldUpdateOperationsInput | $Enums.ElementType
    content?: JsonNullValueInput | InputJsonValue
    zIndex?: IntFieldUpdateOperationsInput | number
    locked?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElementUncheckedUpdateManyWithoutSlideInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumElementTypeFieldUpdateOperationsInput | $Enums.ElementType
    content?: JsonNullValueInput | InputJsonValue
    zIndex?: IntFieldUpdateOperationsInput | number
    locked?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}