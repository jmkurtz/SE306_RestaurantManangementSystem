export interface UserDto {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    passWord: string;
    isAdmin: boolean;
    priorityStatus: number;
    // This was removed on 4/4/2019 userName: string;
}