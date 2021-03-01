import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> =  {}
    errors.forEach((e) => {
        errorMap[e.field] = e.message
    })
    return errorMap
} 