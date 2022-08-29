export interface ISpreadsheetColumn {
    label: string;
    value: string;
}

const GrowthColumns: ISpreadsheetColumn[] = [
    {
        label: 'Date',
        value: 'date',
    },
    {
        label: 'Total Followers',
        value: 'totalFollowers',
    },
];

const FollowersColumns: ISpreadsheetColumn[] = [
    {
        label: 'Date',
        value: 'date',
    },
    {
        label: 'Joined',
        value: 'joined',
    },
    {
        label: 'Left',
        value: 'left',
    },
];

const NotificationsColumns: ISpreadsheetColumn[] = [
    {
        label: 'Date',
        value: 'date',
    },
    {
        label: 'Muted',
        value: 'muted',
    },
    {
        label: 'Unmuted',
        value: 'unmuted',
    },
];

const ViewsBySourceColumns: ISpreadsheetColumn[] = [
    {
        label: 'Date',
        value: 'date',
    },
    {
        label: 'Followers',
        value: 'followers',
    },
    {
        label: 'Other',
        value: 'other',
    },
    {
        label: 'Channels',
        value: 'channels',
    },
    {
        label: 'Pm',
        value: 'pm',
    },
    {
        label: 'Total',
        value: 'total',
    },
];

const InteractionsColumns: ISpreadsheetColumn[] = [
    {
        label: 'Date',
        value: 'date',
    },
    {
        label: 'Views',
        value: 'views',
    },
    {
        label: 'Shares',
        value: 'shares',
    },
];

const PostsColumns: ISpreadsheetColumn[] = [
    {
        label: 'Title',
        value: 'title',
    },
    {
        label: 'Created At',
        value: 'createdAt',
    },
    {
        label: 'Views',
        value: 'views',
    },
    {
        label: 'Shares',
        value: 'shares',
    },
    {
        label: 'Updated At',
        value: 'updatedAt',
    },
];

export default {
    GrowthColumns,
    FollowersColumns,
    NotificationsColumns,
    ViewsBySourceColumns,
    InteractionsColumns,
    PostsColumns,
};
