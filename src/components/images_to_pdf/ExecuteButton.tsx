import { PDFDocument } from 'pdf-lib'
import { Button } from "@fluentui/react-components"


const getBase64Images = async (inputImages: FileList): Promise<string[]> => {
  const promises: Promise<string>[] = []
  for (const inputImage of inputImages) {
    const promise = new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (fileLoadedEvent) => {
        if (fileLoadedEvent.target === null || typeof fileLoadedEvent.target.result !== 'string') {
          reject(new Error('Error reading file'));
          return;
        }
        resolve(fileLoadedEvent.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(inputImage);
    });
    promises.push(promise)
  }

  const results = await Promise.all(promises);
  return results;
}


const resizeImage = (pageSize: [number, number], imageSize: [number, number]) => {
  // 固定値pageSizeだった場合、収まるように画像を縮小する
  const exceedWidth = imageSize[0] - pageSize[0]
  const exceedHeight = imageSize[1] - pageSize[1]

  const isNotExceeded = exceedWidth <= 0 && exceedHeight <= 0
  if (isNotExceeded) return imageSize

  // pageからはみ出すimageがあるなら対処
  const aspect = imageSize[0] / imageSize[1]
  if (exceedWidth > exceedHeight) {
    const newWidth = (pageSize[0] / imageSize[0]) * imageSize[0]
    const newHeight = (1 / aspect) * newWidth
    return [newWidth, newHeight]
  } else {
    const newHeight = (pageSize[1] / imageSize[1]) * imageSize[1]
    const newWidth = aspect * newHeight
    return [newWidth, newHeight]
  }
}


const createPDF = async (
  inputImages: FileList,
  pageSize: [number, number]
): Promise<Uint8Array> => {
  const base64Images = await getBase64Images(inputImages)

  const pdfDoc = await PDFDocument.create()
  for (const base64Image of base64Images) {
    // TODO: detect extension
    const jpgImage = await pdfDoc.embedJpg(base64Image)
    const jpgDims = jpgImage.scale(1.0)

    let page
    let drawImageSize
    if (pageSize[0] === 0 && pageSize[1] === 0) {
      page = pdfDoc.addPage([jpgDims.width, jpgDims.height])
      drawImageSize = [jpgDims.width, jpgDims.height]
    } else {
      page = pdfDoc.addPage(pageSize)
      drawImageSize = resizeImage(
        [page.getWidth(), page.getHeight()],
        [jpgDims.width, jpgDims.height]
      )
    }

    // Draw the JPG image in the center of the page
    page.drawImage(jpgImage, {
      x: page.getWidth() / 2 - drawImageSize[0] / 2,
      y: page.getHeight() / 2 - drawImageSize[1] / 2,
      width: drawImageSize[0],
      height: drawImageSize[1],
    })
  }
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes: Uint8Array = await pdfDoc.save()
  return pdfBytes
}


type ExecuteButtonProps = {
  inputImages: FileList | undefined,
  pageSize: [number, number],
  setPdfURL: React.Dispatch<React.SetStateAction<string>>,
}

export const ExecuteButton = ({
  inputImages,
  pageSize,
  setPdfURL
}: ExecuteButtonProps) => {
  const processImages = async (
    inputImages: FileList | undefined,
    pageSize: [number, number],
    setPdfURL: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (inputImages === undefined) return
    const pdfBytes = await createPDF(inputImages, pageSize)
    const pdfBlob = new Blob([pdfBytes.buffer], { type: 'application/pdf' })
    const pdfUrl = window.URL.createObjectURL(pdfBlob)
    setPdfURL(pdfUrl)
  }
  return (
    <Button
      onClick={() => processImages(inputImages, pageSize, setPdfURL)}
    >
      Create PDF
    </Button>
  )
}
