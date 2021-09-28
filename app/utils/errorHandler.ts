import Analytics from 'appcenter-analytics';

export default async (error: any) => {
  try {
    await Analytics.trackEvent('Error', { error });
  } catch (catchError) {
    // find a way to handle this better
    return undefined;
  }
};
