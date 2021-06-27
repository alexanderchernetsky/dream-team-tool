import {IProfile, IRole, IUser} from "../interfaces/user";
import {parseAsArray, parseAsBoolean, parseAsNumber, parseAsString, safelyParseOr} from "./common";

export const parseProfile = (profile :unknown) :IProfile => {
    const socialLinks = safelyParseOr(profile, 'social_links', parseAsArray, [] as unknown[]);
    return {
        created_at: safelyParseOr(profile, 'created_at', parseAsString, ''),
        focus: safelyParseOr(profile, 'focus', parseAsString, ''),
        id: safelyParseOr(profile, 'id', parseAsNumber, 0),
        job_title: safelyParseOr(profile, 'job_title', parseAsString, ''),
        rating: safelyParseOr(profile, 'rating', parseAsNumber, 0),
        short_description: safelyParseOr(profile, 'short_description', parseAsString, ''),
        updated_at: safelyParseOr(profile, 'updated_at', parseAsString, ''),
        user_id: safelyParseOr(profile, 'user_id', parseAsNumber, 0),
        social_links: socialLinks.map(link => ({
            link: safelyParseOr(link, 'link', parseAsString, ''),
            name: safelyParseOr(link, 'name', parseAsString, ''),
            profile_name: safelyParseOr(link, 'profile_name', parseAsString, ''),
        }))
    }
}

const parseRoles = (roles: unknown[]) :IRole[] => {
    return roles.map(role => {
        return {
            created_at: safelyParseOr(role, 'created_at', parseAsString, ''),
            id: safelyParseOr(role, 'id', parseAsNumber, 0),
            name: safelyParseOr(role, 'name', parseAsString, ''),
            pivot: {
                role_id: safelyParseOr(role, 'pivot.role_id', parseAsNumber, 0),
                user_id: safelyParseOr(role, 'pivot.user_id', parseAsNumber, 0),
            }
        }
    });
};

export const parseUser = (user: unknown) :IUser => {
    const roles = safelyParseOr(user, 'roles', parseAsArray, [] as unknown[]);
    return {
        age: safelyParseOr(user, 'age', parseAsNumber, 0),
        created_at: safelyParseOr(user, 'created_at', parseAsString, ''),
        date_of_birth: safelyParseOr(user, 'date_of_birth', parseAsString, ''),
        email: safelyParseOr(user, 'email', parseAsString, ''),
        first_name: safelyParseOr(user, 'first_name', parseAsString, ''),
        first_work_date: safelyParseOr(user, 'first_work_date', parseAsString, ''),
        full_name: safelyParseOr(user, 'full_name', parseAsString, ''),
        id: safelyParseOr(user, 'id', parseAsNumber, 0),
        image: safelyParseOr(user, 'image', parseAsString, undefined),
        image_src: safelyParseOr(user, 'image_src', parseAsString, ''),
        is_manager: safelyParseOr(user, 'is_manager', parseAsBoolean, false),
        last_name: safelyParseOr(user, 'last_name', parseAsString, ''),
        remember_token: safelyParseOr(user, 'remember_token', parseAsString, undefined),
        years_of_experience: safelyParseOr(user, 'years_of_experience', parseAsNumber, 0),
        profile: safelyParseOr(user, 'profile', parseProfile, {} as IProfile),
        roles: parseRoles(roles),
        job_title: safelyParseOr(user, 'job_title', parseAsString, ""),
        rating: safelyParseOr(user, 'rating', parseAsNumber, undefined),
        focus: safelyParseOr(user, 'focus', parseAsString, ""),
    }
}
