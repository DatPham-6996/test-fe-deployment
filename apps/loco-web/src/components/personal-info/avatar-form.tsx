'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import { useGetUserImageUploadLinkLazyQuery, useUpdatePersonalInfoMutation } from '@/lib/__generated__/graphql';
import { putS3ObjectUsingPresignedUrl } from '@/lib/api/s3/presigned-url-upload';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { User, updateProfile } from 'firebase/auth';
import { UploadIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';
import { Slider } from '../shadcn/ui/slider';
import getCroppedImg from './avatar-form-utils';

export const AvatarForm = ({ refetchUser, firebaseUser }: { firebaseUser: User; refetchUser: () => void }) => {
  const { formatMessage } = useIntl();
  const { closeDialog } = useResponsiveDialog();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [image, setImage] = useState<{ name: string; type: string }>();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [getUserImageUploadLink] = useGetUserImageUploadLinkLazyQuery();

  const [updatePersonalInfo, { data, error }] = useUpdatePersonalInfoMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onSubmit = async () => {
    if (!firebaseUser.emailVerified) {
      toastError(formatMessage({ id: 'me.personalInfo.requireEmailVerified' }), {
        toastId: 'me.personalInfo.updateFailed',
      });
      return;
    }

    if (!image || !imageSrc || !croppedAreaPixels) {
      toastError(formatMessage({ id: 'me.personalInfo.notEmptyAvatar' }), {
        toastId: 'me.personalInfo.updateFailed',
      });
      return;
    }

    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (!croppedImage) {
      toastError(formatMessage({ id: 'me.personalInfo.croppedImageError' }), {
        toastId: 'me.personalInfo.updateFailed',
      });
      return;
    }

    try {
      const { data } = await getUserImageUploadLink({
        variables: {
          input: {
            fileName: image.name,
          },
        },
        fetchPolicy: 'no-cache',
      });

      if (!data) {
        toastError(formatMessage({ id: 'me.personalInfo.uploadError' }), {
          toastId: 'me.personalInfo.updateFailed',
        });
        return;
      }

      // Get Base64 data instead of Base64 data url.
      const croppedImageBase64Data = croppedImage.split('base64,')[1];

      await putS3ObjectUsingPresignedUrl({
        uploadUrl: data.getUserImageUploadLink.uploadUrl,
        base64Data: croppedImageBase64Data,
        type: data.getUserImageUploadLink.type,
      });

      await updatePersonalInfo({
        variables: {
          data: {
            profileImageURL: data.getUserImageUploadLink.url,
          },
        },
      });

      await updateProfile(firebaseUser, {
        photoURL: data.getUserImageUploadLink.url,
      });

      refetchUser();
    } catch (error) {
      toastError(formatMessage({ id: 'me.personalInfo.updateFailed' }));
    }
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);
    setImage(file);
  };

  if (data) {
    toastSuccess(formatMessage({ id: 'me.personalInfo.updateSuccessfully' }), {
      toastId: 'me.personalInfo.updateSuccessfully',
    });
    closeDialog();
  }

  if (error) {
    toastError(formatMessage({ id: 'me.personalInfo.updateFailed' }), {
      toastId: 'me.personalInfo.updateFailed',
    });
    closeDialog();
  }

  return (
    <>
      <div className="flex flex-col pb-2">
        <p className="text-3xl font-medium mt-8">{formatMessage({ id: 'me.personalInfo.avatar' })}</p>
        <p className="text-muted-foreground text-base font-normal">
          {formatMessage({ id: 'me.personalInfo.editAvatar' })}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-2" {...register('image')}>
        {imageSrc && (
          <div className="relative w-full h-[375px]">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
              classes={{
                containerClassName: 'rounded',
              }}
            />
          </div>
        )}
        {imageSrc && (
          <Slider
            defaultValue={[0]}
            min={1}
            max={3}
            step={0.1}
            className="pt-3 pb-2"
            value={[zoom]}
            onValueChange={(value) => setZoom(value[0])}
          />
        )}
        {!image && (
          <>
            <Button type="button" className="w-full" onClick={() => document.getElementById('avatar')?.click()}>
              <div className="flex items-center justify-center">
                <UploadIcon className="mr-2" size={20} />
                {formatMessage({ id: 'me.personalInfo.uploadAvatar' })}
              </div>
            </Button>
            <Input id="avatar" type="file" accept="image/*" onChange={onImageChange} className="hidden" />
          </>
        )}
        {image && (
          <Button type="submit" className="w-full" loading={isSubmitting}>
            {formatMessage({ id: 'me.personalInfo.update' })}
          </Button>
        )}
      </form>
    </>
  );
};
