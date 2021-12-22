import { Callback, PostConfirmationTriggerEvent, Context } from 'aws-lambda';

export async function  main(
    event: PostConfirmationTriggerEvent,
    _context: Context,
    callback: Callback
): Promise<void> {
    const { userPoolId, userName } = event;
    
}