import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { failureResponse, successResponse } from "../../../../core/presentation/helpers/http-handler";
import { EditNoteUseCase, IEditNoteParams } from "../../domain/usecases/edit-note-usecase";

export class EditNoteController implements Controller {
    constructor (private editNoteUseCase: EditNoteUseCase) { }

    async execute(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<any> {
        try {
            const useCaseData: IEditNoteParams = {
                noteUid: req.params.uid,
                noteData: {
                    title: req.body.title,
                    details: req.body.details
                }
            };

            const result = await this.editNoteUseCase.run(useCaseData);
            successResponse(res, "NoteEdited", result);
        }
        catch (error) {
            failureResponse(res, error);
        }
    }
}