import { IFollowersAnalytics, IGrowthAnalytics, IHourAnalytics, ILanguagesAnalytics } from 'entities/analytics';

const MockGrowth: IGrowthAnalytics[] = [{
    date: '2022-10-1',
    totalFollowers: 20,
},
{
    date: '2022-10-2',
    totalFollowers: 14,
},
{
    date: '2022-10-3',
    totalFollowers: 7,
},
{
    date: '2022-10-4',
    totalFollowers: 32,
}];

const MockFollowers: IFollowersAnalytics[] = [{
    date: '2022-10-1',
    joined: 20,
    left: 3,
},
{
    date: '2022-10-2',
    joined: 54,
    left: 13,
},
{
    date: '2022-10-3',
    joined: 5,
    left: 28,
}];

const MockLanguages: ILanguagesAnalytics[] = [{
    date: '2022-10-1',
    english: '70',
    malay: '10',
    'chinese-simp': '34',
    'chinese-trad': '23',
    indonesia: '12',
    japanese: '22',
    korean: '31',
    total: '202',
}];

// const MockHour: IHourAnalytics[] = [{
//     hour: 0,
//     views: 200,
//     dateRange: '10 Apr - 16 Apr',
// },
// {
//     hour: 1,
//     views: 100,
//     dateRange: '17 Apr - 24 Apr',
// },
// {
//     hour: 2,
//     views: 300,
//     dateRange: '25 Apr - 31 Apr',
// },
// {
//     hour: 2,
//     views: 300,
//     dateRange: '25 Apr - 31 Apr',
// },
// {
//     hour: 2,
//     views: 300,
//     dateRange: '25 Apr - 31 Apr',
// },
// {
//     hour: 2,
//     views: 300,
//     dateRange: '25 Apr - 31 Apr',
// },
// {
//     hour: 2,
//     views: 300,
//     dateRange: '25 Apr - 31 Apr',
// },
// {
//     hour: 2,
//     views: 300,
//     dateRange: '25 Apr - 31 Apr',
// }];

const MockGrowthDownload: IGrowthAnalytics[] = [{
    date: '2022-10-1',
    totalFollowers: 20,
},
{
    date: '2022-10-2',
    totalFollowers: 14,
},
{
    date: '2022-10-3',
    totalFollowers: 7,
},
{
    date: '2022-10-4',
    totalFollowers: 32,
},
{
    date: '2022-10-1',
    totalFollowers: 20,
},
{
    date: '2022-10-2',
    totalFollowers: 14,
},
{
    date: '2022-10-3',
    totalFollowers: 7,
},
{
    date: '2022-10-4',
    totalFollowers: 32,
},
{
    date: '2022-10-1',
    totalFollowers: 20,
},
{
    date: '2022-10-2',
    totalFollowers: 14,
},
{
    date: '2022-10-3',
    totalFollowers: 7,
},
{
    date: '2022-10-4',
    totalFollowers: 32,
},
{
    date: '2022-10-1',
    totalFollowers: 20,
},
{
    date: '2022-10-2',
    totalFollowers: 14,
},
{
    date: '2022-10-3',
    totalFollowers: 7,
},
{
    date: '2022-10-4',
    totalFollowers: 32,
}];

export default {
    MockGrowth,
    MockFollowers,
    MockLanguages,
    // MockHour,
    MockGrowthDownload,
};
