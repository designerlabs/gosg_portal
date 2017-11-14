export interface IMenu{
    title: string;
    data: [IUrl];
}

export interface IUrl{
    name: string;
    topic_id: number;
    json_url: string;
    url: string;
}
