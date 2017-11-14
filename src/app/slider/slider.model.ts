export interface ISlider{
    title: string;
    count: number;
    results: [IResult];
}


export interface IResult{
    id: number;
    title: string;
    description: string;
    image: string;
    url: string;
    active_flag: string;
}
