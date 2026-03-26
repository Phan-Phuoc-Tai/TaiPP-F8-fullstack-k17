-- Tạo bảng wallets
create table wallets
(
    id integer generated always as identity
      constraint wallets_pk
        primary key,
    owner_name varchar(30)                        not null,
    email varchar(100) not null
      constraint wallets_pk_2
       unique,
    balance numeric(18, 2) default 0 not null
      constraint check_balance
      check (balance >= (0)::numeric),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Tạo bảng transaction_types
create table transaction_types
(
    id integer generated always as identity
    constraint transaction_types_pk
     primary key,
    name varchar(30)
    constraint transaction_types_pk_2
     unique
);

-- Tạo bảng transactions
create table transactions
(
    id integer generated always as identity
    constraint transactions_pk
     primary key,
    sender_wallet_id integer
    constraint transactions_wallets_id_fk
     references wallets,
    receiver_wallet_id integer
    constraint transactions_wallets_id_fk_2
     references wallets,
    type_id integer
    constraint transactions_types_id_fk
     references transaction_types,
    amount numeric(18, 2) not null
    constraint check_amount
     check (amount > (0)::numeric),
    note text,
    created_at timestamp with time zone default now()
);

-- Tạo status kiểu enum
create type transaction_status_enum as enum ('success', 'failed');

-- Tạo bảng transaction_logs
create table transaction_logs
(
    id integer generated always as identity
    constraint transaction_logs_pk
     primary key,
    transaction_id integer
    constraint transaction_logs_transactions_id_fk
     references transactions,
    step  varchar(50),
    status transaction_status_enum,
    created_at timestamp with time zone default now()
);